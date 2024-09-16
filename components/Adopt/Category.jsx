import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Stray Dog");

  useEffect(() => {
    setCategoryList([]);
    GetCategories();
  }, []);
  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, "category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <View>
      <Text className="font-general-sans-medium text-[20px] mt-2 mb-1">
        Category
      </Text>

      <FlatList
        data={categoryList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className={`flex-1 w-screen mr-2 ${index % 2 === 1 ? "mr-0" : ""}`}
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name);
            }}
          >
            <View
              className={`p-[12px] items-center mt-1 rounded-xl ${
                selectedCategory == item.name ? "bg-btn-orange" : "bg-platinum"
              }`}
            >
              <Image
                source={{ uri: item?.imageURL }}
                className="w-[40px] h-[40px]"
              />
              <Text
                className={`font-general-sans-medium ${
                  selectedCategory == item.name
                    ? "text-white font-general-sans-semibold"
                    : "text-grey"
                }`}
              >
                {item?.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
