import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);
  return (
    <View>
      <ScrollView className="mb-[55px]" showsVerticalScrollIndicator={false}>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
      </ScrollView>
      <View className="absolute w-screen bottom-0">
        <TouchableOpacity className="p-4 bg-btn-orange">
          <Text className="text-center font-general-sans-semibold text-[18px]">
            Adopt
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
