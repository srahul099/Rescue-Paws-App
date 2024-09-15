import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AnimInfo from "../../components/Home/AnimInfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faMapPin } from "@fortawesome/free-solid-svg-icons";
import * as Linking from "expo-linking";
import AnimSubInfo from "../../components/Home/AnimSubInfo";
export default function AnimDetails() {
  const anim = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      // headerTransparent: true,
      headerTitle: anim.breed,
    });
  }, [navigation]);
  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${anim?.latitude},${anim?.longitude}`,
      android: `geo:0,0?q=${anim?.latitude},${anim?.longitude}`,
    });
    // console.log(url);
    Linking.openURL(url);
  };
  return (
    <View className="h-full">
      <ScrollView className="mb-[55px]" showsVerticalScrollIndicator={false}>
        <AnimInfo anim={anim} />
        <AnimSubInfo anim={anim} />
      </ScrollView>
      <View className="absolute w-screen bottom-0">
        <TouchableOpacity onPress={() => openMaps()}>
          <View className="flex flex-row items-center justify-center bg-charcoal p-4 ">
            <FontAwesomeIcon icon={faMapPin} color="#fff" size={"20px"} />
            <Text className="text-[20px] text-white px-2">Location</Text>
            <FontAwesomeIcon icon={faChevronRight} color="#fff" size={"20px"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
