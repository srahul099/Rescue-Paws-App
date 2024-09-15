import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment/moment";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    GetUserDetails();
    const unSubscribe = onSnapshot(
      collection(db, "chat", params?.id, "Messages"),
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
    console.log(result);
    const user2 = result?.users.filter(
      (item) => item.email != user?.primaryEmailAddress.emailAddress
    );
    console.log(user2);
    navigation.setOptions({
      headerTitle: user2[0].name,
    });
  };

  const onSend = async (newMessage) => {
    console.log(newMessage);
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, newMessage)
    );
    newMessage[0].createdAt = moment().format("MM-DD-YYYY HH:mm:ss");
    await addDoc(collection(db, "chat", params.id, "Messages"), newMessage[0]);
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
