import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import {
  faBarsProgress,
  faPlus,
  faRightFromBracket,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function profile() {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const menu = [
    {
      id: 2,
      name: "Manage Posts",
      icon: faBarsProgress,
      path: "/manage-posts",
    },
    {
      id: 3,
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

  const PressCreate = (route) => {
    setModalVisible(false);
    return router.push(route);
  };
  return (
    <SafeAreaView className="px-[20px]">
      <Text className="font-general-sans-semibold text-3xl mt-4">Profile</Text>
      <View className="flex flex-col justify-center items-center mx-[20px] my-[50px]">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[80] h-[80] rounded-[100px] "
        />
        <Text className="font-general-sans-semibold text-xl mt-1">
          {user?.fullName}
        </Text>
        <Text className="font-general-sans-medium text-md text-smoke mt-1">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex flex-row justify-start items-center bg-light-orange mt-5 p-6 rounded-xl w-full"
        >
          <FontAwesomeIcon
            icon={faPlus}
            color="#FF6D00"
            size={"25px"}
            className="p-2"
          />
          <Text className="font-general-sans-medium text-xl ml-3">
            Create Post
          </Text>
        </TouchableOpacity>
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
          className="mt-1 w-full"
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          }}
        >
          <View className=" px-5 py-5 bg-white w-[90%] h-fit justify-between rounded-3xl mb-5">
            <View className="flex flex-row items-center justify-start mb-5">
              <FontAwesomeIcon icon={faSquarePlus} size={"25px"} />
              <Text className="font-general-sans-bold text-left text-2xl  ml-2">
                Create a post
              </Text>
            </View>
            <Text className="font-general-sans-medium text-left text-[17px] mb-5">
              Would you like to create a post for dog rescue or for adoption?
            </Text>
            <TouchableOpacity
              onPress={() => PressCreate("/add-new-pet")}
              className="p-4 bg-light-orange rounded-t-xl mt-3 w-full items-center"
            >
              <Text className="font-general-sans-medium">
                Add Post for Adoption
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => PressCreate("/add-new-anim")}
              className="p-4 bg-light-orange mt-1 w-full items-center"
            >
              <Text className="font-general-sans-medium">
                Add Post for Rescue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              className="p-4 bg-light-orange rounded-b-xl mt-1 w-full items-center"
            >
              <Text className="font-general-sans-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
