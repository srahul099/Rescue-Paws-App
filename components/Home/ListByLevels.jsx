import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Levels from "./Levels";
import AnimListItem from "./AnimListItem";

export default function ListByLevels() {
  const [animList, setAnimList] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [level, setLevel] = React.useState("High");
  useEffect(() => {
    GetAnimList("High");
  }, []);
  const GetAnimList = async (level) => {
    setLoader(true);
    setAnimList([]);
    const q = query(
      collection(db, "injured-anim"),
      where("level", "==", level ? level : "High")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setAnimList((animList) => [...animList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View className="mt-1">
      <Levels
        level={(value) => {
          setLevel(value);
          GetAnimList(value);
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={animList}
        renderItem={({ item, index }) => <AnimListItem anim={item} />}
        refreshing={loader}
        onRefresh={() => GetAnimList(level)}
        className="mt-5 mb-[190px]"
      />
    </View>
  );
}
