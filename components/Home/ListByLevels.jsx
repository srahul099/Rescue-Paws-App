import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Levels from "./Levels";
import AnimListItem from "./AnimListItem";
import { useFocusEffect } from "expo-router";

export default function ListByLevels() {
  const [animList, setAnimList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [level, setLevel] = useState("High");

  const GetAnimList = async (level) => {
    setLoader(true);
    setAnimList([]);
    const q = query(
      collection(db, "injured-anim"),
      where("level", "==", level),
      where("status", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const anims = [];
    querySnapshot.forEach((doc) => {
      anims.push({ id: doc.id, ...doc.data() });
    });
    setAnimList(anims);
    setLoader(false);
  };
  useFocusEffect(
    useCallback(() => {
      GetAnimList(level);
    }, [level])
  );

  return (
    <View className="mt-0">
      <Levels
        level={(value) => {
          setLevel(value);
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={animList}
        renderItem={({ item, index }) => <AnimListItem anim={item} />}
        refreshing={loader}
        ListEmptyComponent={
          !loader && (
            <View className="items-center w-full">
              <Text className="text-2xl w-[80%] text-smoke font-general-sans-semibold text-center mt-2">
                All pets are safe and sound ❤️.
              </Text>
            </View>
          )
        }
        onRefresh={() => GetAnimList(level)}
        className="mt-5 mb-[190px] w-full"
      />
    </View>
  );
}
