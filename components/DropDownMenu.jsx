import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const ItemSeparator = () => (
  <View className="h-[1px] bg-platinum rounded xl mx-2" />
);
export default function DropDownMenu({ field, data, onSelect, zIndex }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setExpanded(false);
  };
  return (
    <View className={`relative`} style={{ zIndex }}>
      <TouchableOpacity
        className="flex flex-row justify-between p-3 items-center bg-white rounded-md mt-1.5"
        onPress={toggleExpanded}
      >
        <Text>{selectedItem ? selectedItem : `Select ${field}`}</Text>
        <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} />
      </TouchableOpacity>
      {expanded ? (
        <View className="absolute top-[50px] w-full bg-white p-2 rounded-md mt-1 z-4">
          <FlatList
            keyExtractor={(item) => item}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text className="p-2">{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>
      ) : null}
    </View>
  );
}
