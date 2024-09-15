import { Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, useRootNavigationState } from "expo-router";
import { useUser } from "@clerk/clerk-react";
export default function App() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();
  const CheckNavLoaded = () => {
    if (!rootNavigationState.key) return null;
  };
  useEffect(() => {
    CheckNavLoaded();
  }, [rootNavigationState]);

  return (
    <View className="flex-1 items-center justify-center">
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />}
    </View>
  );
}
