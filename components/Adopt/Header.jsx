import { View, Text, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { ClerkLoaded, SignedIn, useUser } from "@clerk/clerk-react";
import { router } from "expo-router";

export default function Header() {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconpacks.net%2Ffree-icon%2Fuser-3296.html&psig=AOvVaw08p3RKH1R9sXZC3s13cCae&ust=1724929848190000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOD6v8jGl4gDFQAAAAAdAAAAABAE"
  );
  const [userName, setUserName] = useState("user");
  useEffect(() => {
    console.log("User:", user);
    if (user != null) {
      setImageUrl(user.imageUrl);
      setUserName(user.firstName);
    }
  }, [user]);
  // const sendNotification = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://rescuepawsbackendserver.onrender.com/sendNotification",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           title: "New Injured Animal",
  //           body: `Pet is in need of care.`,
  //           topic: "allUsers",
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to send notification");
  //     }
  //     console.log("Notification sent successfully");
  //   } catch (error) {
  //     console.error("Error sending notification:", error);
  //   }
  // };
  // const handlePress = async () => {
  //   sendNotification();
  // };
  return (
    <ClerkLoaded>
      <SignedIn>
        <View className="flex flex-row justify-between items-center mt-1">
          <View className="flex flex-col">
            <Text className="font-general-sans-medium text-lg text-grey">
              Welcome,
            </Text>
            <Text className="font-general-sans-semibold text-2xl ">
              {userName}
            </Text>
          </View>
          <Image
            source={{ uri: imageUrl }}
            className="w-[40px] h-[40px] rounded-3xl"
          />
        </View>
        {/* <Button title="Notifications bruda" onPress={handlePress} /> */}
      </SignedIn>
    </ClerkLoaded>
  );
}
