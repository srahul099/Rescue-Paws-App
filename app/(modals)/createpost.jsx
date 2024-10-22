import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";

export default function createpost() {
  const [modalVisible, setModalVisible] = useState(true);
  return (
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
            <FontAwesomeIcon icon={faImage} size={"25px"} />
            <Text className="font-general-sans-bold text-left text-2xl  ml-2">
              Upload a Photo
            </Text>
          </View>
          <Text className="font-general-sans-medium text-left text-[17px] mb-5">
            Would you like to upload a photo using your camera or select one
            from your gallery?
          </Text>
          <TouchableOpacity
            onPress={""}
            className="p-4 bg-light-orange rounded-t-xl mt-3 w-full items-center"
          >
            <Text className="font-general-sans-medium">Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={""}
            className="p-4 bg-light-orange mt-1 w-full items-center"
          >
            <Text className="font-general-sans-medium">Gallery</Text>
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
  );
}
