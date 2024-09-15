import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Redirect, useRouter } from "expo-router";
export default function profile() {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();
  const menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: faPlus,
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "Logout",
      icon: faRightFromBracket,
      path: "logout",
    },
  ];
  const onPressMenu = (menu) => {
    if (menu.path == "logout") {
      signOut();
      return router.push("/login");
    }
    return router.push(menu.path);
  };
  return (
    <View className="p-7 mt-7">
      <Text className="font-general-sans-semibold text-3xl">Profile</Text>
      <View className="flex flex-col justify-center items-center mx-[20px] my-[50px]">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[80] h-[80] rounded-[100px] "
        />
        <Text className="font-general-sans-semibold text-xl">
          {user?.fullName}
        </Text>
        <Text className="font-general-sans-medium text-md text-smoke">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <FlatList
          data={menu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onPressMenu(item)}
              className="flex flex-row justify-start items-center bg-light-orange my-1 p-6 rounded-xl"
            >
              <FontAwesomeIcon
                icon={item?.icon}
                color="#FF6D00"
                size={"25px"}
                className="p-2"
              />
              <Text className="font-general-sans-medium text-xl ml-3">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          className="mt-5 w-full"
        />
      </View>
    </View>
  );
}
