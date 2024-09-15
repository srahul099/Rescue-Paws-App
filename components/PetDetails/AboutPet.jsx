import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function AboutPet({ pet }) {
  const [readmore, setReadmore] = useState(true);
  return (
    <View className="m-6 mt-0 px-4 py-3 rounded-xl bg-platinum">
      <Text className="font-general-sans-semibold text-xl">About</Text>
      <Text
        numberOfLines={readmore ? 3 : 20}
        className="text-md font-general-sans pt-1"
      >
        {pet?.about}
      </Text>
      {readmore && (
        <TouchableOpacity onPress={() => setReadmore(false)}>
          <Text className="self-end p-1 text-btn-orange font-general-sans-medium">
            Read More
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
