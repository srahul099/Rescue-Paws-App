import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import { useUser } from "@clerk/clerk-react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  const InitiateChat = async () => {
    console.log(user?.primaryEmailAddress?.emailAddress);
    const docID1 = user?.primaryEmailAddress?.emailAddress + "_" + pet?.email;
    const docID2 = pet?.email + "_" + user?.primaryEmailAddress?.emailAddress;

    const q = query(
      collection(db, "chat"),
      where("id", "in", [docID1, docID2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });
    console.log(docID1);
    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, "chat", docID1), {
        id: docID1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.userName,
          },
        ],
        userIds: [user?.primaryEmailAddress?.emailAddress, pet?.email],
      });
      router.push({
        pathname: "/chat",
        params: { id: docID1 },
      });
    }
  };
  return (
    <SafeAreaView>
      <ScrollView className="mb-[55px]" showsVerticalScrollIndicator={false}>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
      </ScrollView>
      <View className="absolute w-screen bottom-0">
        <TouchableOpacity className="p-4 bg-btn-orange" onPress={InitiateChat}>
          <Text className="text-center font-general-sans-semibold text-[18px]">
            Enquire
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
