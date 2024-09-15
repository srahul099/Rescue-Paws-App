import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function UserItem({ userInfo }) {
  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/chat",
      params: { id: userInfo.docID },
    });
  };
  return (
    <TouchableOpacity onPress={handlePress} href={"/chat?id=" + userInfo.docID}>
      <View className="flex flex-row justify-start items-center bg-platinum p-3 rounded-xl">
        <Image
          source={{ uri: userInfo?.imageUrl }}
          className="h-[50px] w-[50px] rounded-full"
        />
        <Text className="ml-4 font-general-sans-medium text-lg">
          {userInfo.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
