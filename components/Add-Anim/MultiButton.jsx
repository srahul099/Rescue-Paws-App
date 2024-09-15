import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export default function MultiButton({ data, onSelect, tag }) {
  const [itemlists, setItemlists] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const tagval = {
    High: "Needs Immegiate Attention",
    Medium: "Requires Timely Intervention",
    Low: "Safe but needs ongoing care",
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    tag(tagval[item]);
    onSelect(item);
  };

  useEffect(() => {
    setItemlists([]);
  }, []);
  return (
    <View>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              handleSelect(item);
            }}
            className={`flex-1 w-screen mr-2 ${
              index == data.length - 1 ? "mr-0" : ""
            }`}
          >
            <View
              className={`p-[15px] items-center mt-1 rounded-md ${
                selectedItem == item ? `bg-charcoal` : `bg-platinum`
              }`}
            >
              <Text
                className={`font-general-sans-medium ${
                  selectedItem == item
                    ? "text-white font-general-sans-semibold"
                    : "text-charcoal"
                }`}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
