import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Category from "../Adopt/Category";

export default function Levels({ level }) {
  const [levellists, setLevellists] = useState([]);
  const [selectedlevel, setSelectedLevel] = useState("High");

  useEffect(() => {
    setLevellists([]);
    getLevels();
    console.log(levellists);
  }, []);
  const getLevels = async () => {
    setLevellists([]);
    const snapshot = await getDocs(collection(db, "levels"));
    snapshot.forEach((doc) => {
      setLevellists((levels) => [...levels, doc.data()]);
    });
  };
  return (
    <View>
      <Text className="font-general-sans-medium text-[20px] mt-5 mb-1">
        Rescue
      </Text>
      <FlatList
        data={levellists}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedLevel(item.level);
              level(item.level);
            }}
            className={`flex-1 w-screen mr-2 ${index == 2 ? "mr-0" : ""}`}
          >
            <View
              className={`p-[10px] items-center mt-1 rounded-xl ${
                selectedlevel == item.level ? `bg-charcoal` : `bg-platinum`
              }`}
            >
              <View className="p-3">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  size={"30px"}
                  color={item.color}
                />
              </View>
              <Text
                className={`font-general-sans-medium ${
                  selectedlevel == item.level
                    ? "text-white font-general-sans-semibold"
                    : "text-charcoal"
                }`}
              >
                {item.level}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
