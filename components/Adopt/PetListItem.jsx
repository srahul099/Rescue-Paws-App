import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCalendarDays,
  faClock,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";

export default function PetListItem({ pet }) {
  const timeDifference = moment(pet?.time).fromNow();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/pet-details",
          params: pet,
        });
      }}
      className="bg-white rounded-3xl px-4 py-4 mb-3"
    >
      <Image
        source={{ uri: pet?.imageURL }}
        className="h-[250px] object-cover rounded-xl rounded-b-sm"
      />
      <View className="flex flex-row justify-between items-center  mt-2">
        <View className="flex flex-col">
          <Text className="font-general-sans-semibold text-[20px]">
            {pet.breed}
          </Text>
          <Text className="text-lg font-general-sans-medium text-smoke">
            {pet?.sex}
          </Text>
        </View>

        <View className="flex items-end justify-start">
          <Text
            className={`font-general-sans-semibold px-2 py-1 rounded-xl self-end ${
              pet.vaccine == "Vaccinated"
                ? "text-green-500 bg-green-200"
                : "text-red-500 bg-red-200"
            }`}
          >
            {pet.vaccine}
          </Text>
        </View>
      </View>
      <View className="absolute top-7 right-6 rounded-md px-2 py-1 bg-platinum">
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
