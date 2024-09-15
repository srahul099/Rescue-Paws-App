import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function PetListItem({ pet }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/pet-details",
          params: pet,
        });
        console.log(pet);
      }}
      className="bg-white rounded-2xl px-4 py-5 mb-3"
    >
      <Image
        source={{ uri: pet?.imageURL }}
        className="h-[250px] object-cover rounded-lg"
      />
      <View className="flex ">
        <Text className="font-general-sans-semibold text-[20px] mt-2">
          {pet.breed}
        </Text>
        <Text className="font-general-sans-medium text-[#8E8E8E] text-lg ">
          {pet.age} YRS
        </Text>

        <Text
          className={`font-general-sans-semibold px-2 py-1 rounded-xl self-start ${
            pet.vaccine == "Vaccinated"
              ? "text-green-500 bg-green-200"
              : "text-red-500 bg-red-200"
          }`}
        >
          {pet.vaccine}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
