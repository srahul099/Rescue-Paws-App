import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import moment from "moment/moment";
export default function ChatScreen() {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    GetUserDetails();
    const unSubscribe = onSnapshot(
      query(
        collection(db, "chat", params?.id, "Messages"),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unSubscribe();
  }, []);
  const GetUserDetails = async () => {
    const docRef = doc(db, "chat", params?.id);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const user2 = result?.users.filter(
      (item) => item.email != user?.primaryEmailAddress.emailAddress
    );
    navigation.setOptions({
      headerTitle: user2[0].name,
    });
  };

  const onSend = async (newMessage) => {
    newMessage[0].createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, newMessage)
    );
    await addDoc(collection(db, "chat", params.id, "Messages"), newMessage[0]);
  };
  return (
    <View className="flex-1 bg-light-orange">
      <StatusBar backgroundColor={"#fff"} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        showUserAvatar={true}
        alwaysShowSend
        forceGetKeyboardHeight={
          Platform.OS === "android" && Platform.Version < 21
        }
        user={{
          _id: user?.primaryEmailAddress.emailAddress,
          name: user?.fullName,
          avatar: user?.imageUrl,
        }}
      />
    </View>
  );
}
