import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
  faChevronRight,
  faMapPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Linking from "expo-linking";
import fetchLocationDetails from "../../services/ReverseLocation";
export default function PetInfo({ pet }) {
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchLocation = async () => {
      const result = await fetchLocationDetails(pet.latitude, pet.longitude);
      if (result && result.results && result.results.length > 0) {
        const { city, country } = result.results[0];
        setLocation({ city, country });
      }
    };

    if (pet.latitude && pet.longitude) {
      fetchLocation();
    }
  }, [pet.latitude, pet.longitude]);
  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${pet?.latitude},${pet?.longitude}`,
      android: `geo:0,0?q=${pet?.latitude},${pet?.longitude}`,
    });
    // console.log(url);
    Linking.openURL(url);
  };
  // console.log(JSON.stringify(pet.location.latitude));
  return (
    <View>
      <Image
        source={{ uri: pet?.imageURL }}
        className="w-full h-[450px] object-cover object-center"
      />
      <View className="m-6 mr-6 flex flex-row justify-between items-center">
        <View className="w-[40%]">
          <Text className="font-general-sans-semibold text-2xl text-warp">
            {pet?.breed}
          </Text>
          <TouchableOpacity onPress={() => openMaps()} className="mt-1">
            <View className="flex flex-row self-start items-center justify-evenly bg-platinum p-1 rounded-xl">
              <FontAwesomeIcon icon={faMapPin} color="#808080" size={"15px"} />
              <Text
                className="text-[15px] text-smoke"
                allowFontScaling={false}
                allow
              >
                {location.city}
              </Text>
              <FontAwesomeIcon icon={faChevronRight} color="#808080" />
            </View>
          </TouchableOpacity>
        </View>
        {/* <FontAwesomeIcon icon={faStar} size={"30px"} color="#E5E4E2" /> */}
        <View className="flex flex-row bg-white rounded-3xl items-center">
          <View className="px-3 ">
            <Text className="text-xs font-general-sans-medium text-smoke">
              Poster By:
            </Text>
            <Text className="text-sm font-general-sans-medium">
              {pet?.userName}
            </Text>
          </View>

          <Image
            source={{ uri: pet?.userImage }}
            className="w-[50px] h-[50px] rounded-3xl m-1"
          />
        </View>
      </View>
    </View>
  );
}
