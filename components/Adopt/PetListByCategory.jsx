import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Category from "./Category";
import { and, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./PetListItem";
import { set } from "date-fns";
import { useFocusEffect } from "expo-router";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState("Stray Dog");

  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(
      collection(db, "pet"),
      where("category", "==", category ? category : "Stray Dog"),
      where("status", "==", false)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };

  useFocusEffect(
    useCallback(() => {
      GetPetList(category);
    }, [category])
  );
  return (
    <View className="mt-1">
      <Category
        category={(value) => {
          setCategory(value);
          GetPetList(value);
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={petList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
        refreshing={loader}
        onRefresh={() => GetPetList(category)}
        className="mt-5 mb-[120px]"
      />
    </View>
  );
}
