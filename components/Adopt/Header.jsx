import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ClerkLoaded, SignedIn, useUser } from "@clerk/clerk-react";

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
  return (
    <ClerkLoaded>
      <SignedIn>
        <View className="flex flex-row justify-between items-center">
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
      </SignedIn>
    </ClerkLoaded>
  );
}
