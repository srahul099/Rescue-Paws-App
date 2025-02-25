import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ClerkLoaded, SignedIn, useUser } from "@clerk/clerk-react";
import { Link, router } from "expo-router";
import logo from "../../assets/images/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Header({ type }) {
  const header = {
    rescue: {
      title: "Report Injury",
      color: "charcoal",
      route: "/add-new-anim",
    },
    adopt: {
      title: "List Pet",
      color: "btn-orange",
      route: "/add-new-pet",
    },
  };
  // const sendNotification = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://rescuepawsbackendserver.onrender.com/sendNotification",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           title: "New Injured Animal",
  //           body: `Pet is in need of care.`,
  //           topic: "allUsers",
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to send notification");
  //     }
  //     console.log("Notification sent successfully");
  //   } catch (error) {
  //     console.error("Error sending notification:", error);
  //   }
  // };
  const handlePress = async () => {
    router.push(header[type].route);
  };
  return (
    <ClerkLoaded>
      <View className="flex-row justify-between items-center mt-5">
        <View>
          <Text className="font-general-sans-semibold text-[25px] color-[#FF8D08] ">
            Rescue Paws
          </Text>
        </View>
        <TouchableOpacity
          className={`flex-row items-center bg-${header[type].color} px-3 py-2 rounded-xl`}
          onPress={() => handlePress()}
        >
          <Text className="font-general-sans-semibold text-white mr-2">
            {header[type].title}
          </Text>
          <FontAwesomeIcon icon={faPlus} color="white" size={"20px"} />
        </TouchableOpacity>
      </View>
    </ClerkLoaded>
  );
}
