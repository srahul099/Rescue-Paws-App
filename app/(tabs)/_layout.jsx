import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHandHoldingHeart,
  faHouse,
  faMessage,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { StatusBar } from "expo-status-bar";
import { SignedIn, useUser } from "@clerk/clerk-react";

export default function TabLayout() {
  const user = useUser();
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    if (user && user.user) {
      console.log("User:", user.user.imageUrl);
      setImgUrl(user.user.imageUrl);
    }
  }, [user]);
  return (
    <SignedIn>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF8D08",
          tabBarStyle: { height: 70, paddingTop: 4 },
          tabBarLabelStyle: { fontSize: 12, paddingTop: 4 },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faHouse} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="adopt"
          options={{
            title: "Adopt",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: "Inbox",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMessage} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color }) => {
              return imgUrl ? (
                <Image
                  className="h-[28px] w-[28px] rounded-3xl"
                  source={{ uri: imgUrl }}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} color={color} size={24} />
              );
            },
          }}
        />
      </Tabs>
    </SignedIn>
  );
}
