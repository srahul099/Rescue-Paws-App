import { View, Text, TouchableOpacity, Image, Vibration } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { parseISO, differenceInDays, isToday, parse } from "date-fns";
import {
  faClock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import moment from "moment/moment";

export default function AnimListItem({ anim }) {
  const getBackgroundColorClass = (level) => {
    switch (level) {
      case "High":
        return "bg-btn-red";
      case "Medium":
        return "bg-btn-yellow";
      case "Low":
        return "bg-btn-green";
      default:
        return "bg-gray-300"; // Default background color if level is not recognized
    }
  };

  const timeDifference = moment(anim?.time).fromNow();

  const date = new Date();
  console.log(date);
  return (
    <TouchableOpacity
      onLongPress={() => {
        Vibration.vibrate(100);
      }}
      onPress={() => {
        router.push({
          pathname: "/anim-details",
          params: anim,
        });
        console.log(anim);
      }}
      className="bg-white rounded-2xl px-4 py-4 mb-3 pb-2"
    >
      <Image
        source={{ uri: anim?.imageURL }}
        className="h-[200px] object-cover rounded-t-lg mb-2"
      />
      <View className="flex-1 flex-row justify-between items-center">
        <View className="flex-1 justify-center items-start overflow-hidden w-[50%]">
          <Text className="font-general-sans-semibold text-[20px] text-ellipsis">
            {anim.breed}
          </Text>
          <Text className="font-general-sans-semibold text-smoke text-sm break-words">
            {anim.sex}
          </Text>
        </View>
        <View
          className={`flex flex-row justify-center items-center p-1.5 rounded-lg w-1/2 ${getBackgroundColorClass(
            anim.level
          )}`}
        >
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size={"20px"}
            color="white"
          />
          <Text className="font-general-sans-medium text-white text-sm ml-2 break-words">
            {anim.tag}
          </Text>
        </View>
      </View>
      <View className="absolute top-6 right-6 rounded-md px-2 py-1 bg-platinum">
        <View className="flex flex-row items-center justify-end ">
          <FontAwesomeIcon icon={faClock} color="#808080" size={"12px"} />
          <Text className="font-general-sans-medium  text-smoke ml-1 text-sm">
            Posted {timeDifference}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
