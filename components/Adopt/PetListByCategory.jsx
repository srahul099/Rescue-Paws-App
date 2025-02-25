import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
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
    console.log(petList);
    const q = query(
      collection(db, "pet"),
      where("category", "==", category ? category : "Stray Dog"),
      where("status", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push({ id: doc.id, ...doc.data() });
    });
    setPetList(pets);
    setLoader(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect");
      setPetList([]);
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
        onRefresh={() => GetPetList(category) && setPetList([])}
        className="mt-3 mb-[120px]"
      />
    </View>
  );
}
