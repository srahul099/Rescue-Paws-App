import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AnimInfo from "../../components/Home/AnimInfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faMapPin } from "@fortawesome/free-solid-svg-icons";
import * as Linking from "expo-linking";
import AnimSubInfo from "../../components/Home/AnimSubInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionSuggest from "../../components/Ai-Action-suggest/ActionSuggest";
export default function AnimDetails() {
  const anim = useLocalSearchParams();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerTitle: anim.breed,
    });
  }, [navigation]);
  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${anim?.latitude},${anim?.longitude}`,
      android: `geo:0,0?q=${anim?.latitude},${anim?.longitude}`,
    });
    Linking.openURL(url);
  };
  const handleScrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };
  return (
    <View className="h-full">
      <StatusBar backgroundColor={"#fff"} />
      <ScrollView
        ref={scrollViewRef}
        className="mb-[55px]"
        showsVerticalScrollIndicator={false}
      >
        <AnimInfo anim={anim} />
        <AnimSubInfo anim={anim} />
        <ActionSuggest data={anim} onSuggest={handleScrollToEnd} />
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
