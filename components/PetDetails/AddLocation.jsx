import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import * as Location from "expo-location";
export default function AddLocation({ onSelect }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    setLocation();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    handleSelect(location.coords);
  };

  const handleSelect = (location) => {
    if (location) {
      onSelect(location);
    }
  };
  return (
    <View>
      <TouchableOpacity
        className={`p-4 mt-1.5 ${
          location ? "bg-green-200" : "bg-platinum"
        } rounded-2xl flex flex-row justify-between items-center`}
        onPress={getLocation}
      >
        {location ? (
          <Text
            className={`text-[15px] font-general-sans-medium text-green-500`}
          >
            Current Location is Set
          </Text>
        ) : (
          <Text className={`text-[15px] font-general-sans-medium text-smoke `}>
            Set Current Location
          </Text>
        )}
        <FontAwesomeIcon
          icon={location ? faCheck : faLocationCrosshairs}
          size={"25px"}
          color={`${location ? "#22c55e" : "#808080"}`}
        />
      </TouchableOpacity>
    </View>
  );
}
