import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [petList, setPetList] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [category, setCategory] = React.useState("Stray Dog");
  useEffect(() => {
    GetPetList("Stray Dog");
  }, []);
  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(
      collection(db, "pet"),
      where("category", "==", category ? category : "Stray Dog")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View>
      <Category
        category={(value) => {
          setCategory(value);
          GetPetList(value);
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={petList}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
        refreshing={loader}
        onRefresh={() => GetPetList(category)}
        className="mt-5 mb-[170px]"
      />
    </View>
  );
}
