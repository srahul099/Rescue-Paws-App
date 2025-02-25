import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Vibration,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { parseISO, differenceInDays, isToday, parse } from "date-fns";
import {
  faClock,
  faMapPin,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import moment from "moment/moment";
import fetchLocationDetails from "../../services/ReverseLocation";

export default function AnimListItem({ anim }) {
  const [location, setLocation] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchLocation = async () => {
      setLoader(true);
      const result = await fetchLocationDetails(anim.latitude, anim.longitude);
      if (result && result.results && result.results.length > 0) {
        const { city, country } = result.results[0];
        setLocation({ city, country });
      }
      setLoader(false);
    };

    if (anim.latitude && anim.longitude) {
      fetchLocation();
    }
  }, [anim.latitude, anim.longitude]);
  const getBackgroundColorClass = (level) => {
    switch (level) {
      case "High":
        return "bg-btn-red";
      case "Medium":
        return "bg-btn-yellow";
      case "Low":
        return "bg-btn-green";
      default:
        return "bg-gray-300";
    }
  };

  const timeDifference = moment(anim?.time).fromNow();

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
      }}
      className="bg-white rounded-2xl px-4 py-4 mb-3 pb-2"
    >
      <Image
        source={{ uri: anim?.imageURL }}
        className="h-[200px] object-cover rounded-t-lg mb-2"
      />
      <View className="flex-1 flex-row justify-between items-end">
        <View className="flex-1 justify-center items-start overflow-hidden w-[50%]">
          <Text className="font-general-sans-semibold text-[20px] text-ellipsis">
            {anim.breed}
          </Text>
          <Text className="font-general-sans-semibold text-smoke text-sm break-words">
            {anim.sex}
          </Text>
        </View>
        <View className="flex-1 flex-col justify-between items-end">
          <View className="flex flex-row items-center justify-end mb-1 bg-platinum px-1.5 rounded-lg">
            <FontAwesomeIcon icon={faMapPin} color="#808080" size={"12px"} />
            {location.city && location.country && (
              <Text className="font-general-sans-medium text-smoke text-sm break-words ml-1">
                {location.city}
              </Text>
            )}
          </View>
          <View className="flex flex-row items-center justify-end ">
            <FontAwesomeIcon icon={faClock} color="#808080" size={"10px"} />
            <Text className="font-general-sans-medium  text-smoke ml-1 text-xs">
              Posted {timeDifference}
            </Text>
          </View>
        </View>
      </View>

      <View className="absolute top-6 right-6 rounded-md ">
        <View
          className={`flex flex-row justify-center items-center p-1.5 rounded-lg ${getBackgroundColorClass(
            anim.level
          )}`}
        >
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size={"20px"}
            color="white"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
