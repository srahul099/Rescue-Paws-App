import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
export default function RootLayout() {
  useFonts({
    "generalsans-regular": require("./../assets/fonts/GeneralSans-Regular.otf"),
    "generalsans-bold": require("./../assets/fonts/GeneralSans-Bold.otf"),
    "generalsans-medium": require("./../assets/fonts/GeneralSans-Medium.otf"),
    "generalsans-semibold": require("./../assets/fonts/GeneralSans-Semibold.otf"),
  });
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login/index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ClerkLoaded>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
