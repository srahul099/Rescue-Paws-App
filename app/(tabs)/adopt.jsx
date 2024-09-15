import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Adopt/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import PetListByCategory from "../../components/Adopt/PetListByCategory";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigation } from "expo-router";
import { SignedIn } from "@clerk/clerk-react";

export default function Adopt() {
  return (
    <View className="p-[20px] mt-[20px] flex-1">
      <SignedIn>
        <Header />
        <PetListByCategory />
        <Link
          href="/add-new-pet"
          className="absolute bottom-2 right-1 self-end p-6 bg-btn-orange rounded-2xl mx-2"
        >
          <FontAwesomeIcon icon={faPlus} color="white" size={"24px"} />
        </Link>
      </SignedIn>
    </View>
  );
}
