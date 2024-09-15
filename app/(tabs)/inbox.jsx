import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../config/FirebaseConfig";
import UserItem from "../../components/inbox/UserItem";

export default function inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    user && GetUserList();
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, "chat"),
      where("userIds", "array-contains", user?.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };
  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (users) => users?.email != user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docID: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };
  return (
    <SafeAreaView className="px-[20px]">
      <Text className="font-general-sans-semibold text-2xl ">Inbox</Text>
      <FlatList
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={() => GetUserList()}
        renderItem={({ item, index }) => (
          <View className="mt-1 w-full">
            <UserItem userInfo={item} key={index} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
