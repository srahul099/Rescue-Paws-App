import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Linking from "expo-linking";
export default function AnimInfo({ anim }) {
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
  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${anim?.latitude},${anim?.longitude}`,
      android: `geo:0,0?q=${anim?.latitude},${anim?.longitude}`,
    });
    Linking.openURL(url);
  };
  return (
    <View>
      <Image
        source={{ uri: anim?.imageURL }}
        className=" w-full h-[300px] object-cover object-center"
      />
      <View
        className={`flex flex-row justify-center items-center p-2  ${getBackgroundColorClass(
          anim.level
        )}`}
      >
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size={"20px"}
          color="white"
        />
        <Text className="font-general-sans-medium text-white text-sm flex-wrap ml-2">
          {anim.tag}
        </Text>
      </View>
      <View className="m-6 mr-6 mt-3 flex flex-row justify-between items-center">
        <View className="w-[40%]">
          <Text className="font-general-sans-semibold text-2xl text-warp">
            {anim?.breed}
          </Text>
        </View>
        <View className="flex flex-row bg-white rounded-3xl items-center">
          <View className="px-3 ">
            <Text className="text-xs font-general-sans-medium text-smoke">
              Poster By:
            </Text>
            <Text className="text-sm font-general-sans-medium">
              {anim?.userName}
            </Text>
          </View>

          <Image
            source={{ uri: anim?.userImage }}
            className="w-[50px] h-[50px] rounded-3xl m-1"
          />
        </View>
      </View>
    </View>
  );
}
