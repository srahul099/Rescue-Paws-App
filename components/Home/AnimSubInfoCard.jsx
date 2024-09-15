import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function AnimSubInfoCard({ icon, heading, value, mr }) {
  return (
    <View
      className={`flex flex-row items-center bg-white justify-start p-2 rounded-xl `}
    >
      <View className="p-3 bg-platinum rounded-lg mr-2">
        <FontAwesomeIcon icon={icon} color="#272829" size={"30px"} />
      </View>
      <View>
        <Text className="font-general-sans-semibold text-[16px] text-smoke">
          {heading}
        </Text>
        <Text className="font-general-sans-semibold text-[17px] text-wrap w-[100px]">
          {value}
        </Text>
      </View>
    </View>
  );
}
