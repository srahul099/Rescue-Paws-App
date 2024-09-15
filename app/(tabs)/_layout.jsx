import { View, Text } from "react-native";
import React from "react";
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
import { SignedIn } from "@clerk/clerk-react";

export default function TabLayout() {
  return (
    <SignedIn>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF8D08",
          tabBarStyle: { height: 70, paddingBottom: 4, paddingTop: 4 },
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
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
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    </SignedIn>
  );
}
