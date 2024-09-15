import { View, Text } from "react-native";
import React from "react";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import AnimSubInfoCard from "./AnimSubInfoCard";

export default function AnimSubInfo({ anim }) {
  return (
    <View className="m-6 mt-0">
      <AnimSubInfoCard
        icon={anim.sex == "Male" ? faMars : faVenus}
        heading={"Gender"}
        value={anim?.sex}
        mr={"2"}
      />
      <View className="mt-2">
        <Text className="font-general-sans-semibold text-lg">Description</Text>
        <View className="mt-1 px-4 py-3 rounded-xl bg-platinum w-full">
          <Text>{anim?.description}</Text>
        </View>
      </View>
    </View>
  );
}
