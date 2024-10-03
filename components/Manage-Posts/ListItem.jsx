import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Vibration,
  Modal,
} from "react-native";
import React, { useState } from "react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";

export default function ListItem({ anim }) {
  const postDate = moment(anim.time).format("DD MMMM YYYY");
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const actions = [
    {
      name: "Set Status",
      action: "",
    },
    {
      name: "Delete Post",
      action: "",
    },
    { name: "Cancel", action: "" },
  ];
  return (
    <TouchableOpacity
      onLongPress={() => {
        Vibration.vibrate(50);
        setModal(true);
      }}
      onPress={() =>
        router.push({
          pathname: `${anim.level ? "/anim-details" : "/pet-details"}`,
          params: anim,
        })
      }
      className="bg-white rounded-2xl px-3 py-3 mb-3 flex flex-row"
    >
      <View className="mr-3">
        <Image
          source={{ uri: anim?.imageURL }}
          className="h-[100px] w-[100px] object-cover rounded-lg"
        />
      </View>
      <View className="flex fllex-col">
        <Text className="text-lg p-1 pt-0 font-general-sans-semibold">
          Breed: {anim?.breed}
        </Text>
        <Text className="text-sm px-1 pb-1 font-general-sans-medium text-smoke">
          Posted On: {postDate}
        </Text>
        <View className="flex flex-row px-1 items-center">
          <Text className="text-sm font-general-sans-medium text-smoke">
            Status:{" "}
          </Text>
          {anim?.status ? (
            <FontAwesomeIcon icon={faCircleCheck} color="green" />
          ) : (
            <FontAwesomeIcon icon={faCircleXmark} color="red" />
          )}
        </View>
      </View>
      {modal ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
            }}
          >
            <View className=" px-5 py-6 bg-white items-center w-[80%] rounded-3xl mx-10">
              <Text className="font-general-sans-medium">Choose an action</Text>
              <TouchableOpacity className="p-3 bg-light-orange rounded-t-xl mt-3 w-full items-center">
                <Text className="font-general-sans-medium">Set Status</Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 bg-light-orange mt-1 w-full items-center">
                <Text className="font-general-sans-medium">Delete Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModal(!modal)}
                className="p-3 bg-light-orange rounded-b-xl mt-1 w-full items-center"
              >
                <Text className="font-general-sans-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </TouchableOpacity>
  );
}
