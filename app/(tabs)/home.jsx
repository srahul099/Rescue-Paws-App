import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Adopt/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigation } from "expo-router";
import ListByLevels from "../../components/Home/ListByLevels";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="px-[20px] flex-1">
      <StatusBar backgroundColor={"#F2F2F2"} barStyle={"dark-content"} />
      <Header />
      <ListByLevels />
      <Link
        href="/add-new-anim"
        className="absolute bottom-2 right-1 self-end p-6 bg-charcoal rounded-2xl mx-2"
      >
        <FontAwesomeIcon icon={faPlus} color="white" size={"24px"} />
      </Link>
    </SafeAreaView>
  );
}
