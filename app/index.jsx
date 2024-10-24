import { Pressable, StatusBar, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, useRootNavigationState } from "expo-router";
import { useUser } from "@clerk/clerk-react";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();
  const CheckNavLoaded = () => {
    if (!rootNavigationState || !rootNavigationState.key) return null;
  };
  useEffect(() => {
    CheckNavLoaded();
  }, [rootNavigationState]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />}
    </SafeAreaProvider>
  );
}
