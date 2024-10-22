import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import ListItem from "../../components/Manage-Posts/ListItem";
export default function index() {
  const { user } = useUser();
  const [choice, setChoice] = useState("Rescue");
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const btnData = [
    { name: "Rescue", dbname: "injured-anim" },
    { name: "Adopt", dbname: "pet" },
  ];
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Manage Posts",
      headerTitleStyle: { fontFamily: "generalsans-semibold" },
    });
  }, []);
  useEffect(() => {
    GetList(btnData[0].dbname);
  }, []);
  const handlePress = (item) => {
    setChoice(item.name);
  };
  const GetList = async (dbname) => {
    setLoader(true);
    setList([]);
    const q = query(
      collection(db, `${dbname}`),
      where("email", "==", `${user?.primaryEmailAddress.emailAddress}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setList((list) => [...list, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View className="mx-5 my-4">
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View>
        <FlatList
          data={btnData}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className={`flex-1 w-full ${index == 0 ? "mr-2" : "mr-0"}`}
              onPress={() => {
                handlePress(item);
                GetList(item.dbname);
              }}
            >
              <Text
                className={`p-5 rounded-lg text-center ${
                  item.name == choice
                    ? "bg-charcoal text-white font-general-sans-semibold"
                    : "bg-platinum text-charcoal font-general-sans-medium"
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={({ item, index }) => (
            <ListItem
              anim={item}
              dbname={
                btnData[btnData.findIndex((x) => x.name == choice)].dbname
              }
              refereshData={() =>
                GetList(
                  btnData[btnData.findIndex((x) => x.name == choice)].dbname
                )
              }
            />
          )}
          refreshing={loader}
          onRefresh={() =>
            GetList(btnData[btnData.findIndex((x) => x.name == choice)].dbname)
          }
          className="mt-5 mb-[100px]"
          ListEmptyComponent={
            !loader && (
              <Text className="text-2xl text-smoke font-general-sans-semibold text-center mt-2">
                You have no Posts
              </Text>
            )
          }
        />
      </View>
    </View>
  );
}
