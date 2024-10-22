import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        // Redirect to home page after setting the session active
        Linking.openURL(Linking.createURL("/(tabs)/home", { scheme: "myapp" }));
        // Use setActive to set the session as the active session
      } else {
        // Use signIn or signUp for next steps such as MFA
        console.log("clerk");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);

  return (
    <View className="h-full bg-login-bg">
      <Image
        source={require("./../../assets/images/login.jpg")}
        className="w-full h-[500] justify-center"
      />
      <View className="px-8 pt-2">
        <Text className="text-center font-general-sans-bold text-[30px] text-charcoal">
          Be Their Lifeline!
        </Text>
        <Text className="text-center font-general-sans-medium text-[18px] my-4 text-grey ">
          Help rescue, adopt, and give stray dogs a loving home. Be the change
          they need.
        </Text>
      </View>
      <Pressable
        onPress={onPress}
        className="p-[20px] bg-btn-orange rounded-xl absolute bottom-6 left-8 right-8"
      >
        <Text className="text-center text-white font-general-sans-semibold text-[18px]">
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}
