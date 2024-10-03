import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicatorComponent,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Groq from "groq-sdk/index.mjs";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
export default function ActionSuggest({ data, onSuggest }) {
  const [chatCompletion, setChatCompletion] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const typingIndex = useSharedValue(0);
  const spinValue = useSharedValue(0);

  const fetchChatCompletion = async () => {
    try {
      setError(null);
      setChatCompletion(null);
      setLoading(true);

      // Initialize Groq client
      const groq = new Groq({
        apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY, // Ensure the key is correct
      });

      // Make the request using groq-sdk
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              'You are an AI assistant specialized in providing guidance for handling injured animals. You will be provided with details about the animal\'s breed and a description of its injury. Based on the information given, respond with 5 clear and concise steps on what should be done immediately to help the animal. The response must always be returned in the following JSON format:\n\n { "steps": ["step 1", "step 2", "step 3", "step 4", "step 5"] }\n\n stick to the given format at all times do not mention the step numbers incase of an inaccurate description return an error. The final step must always suggest visiting a veterinarian.',
          },
          {
            role: "user",
            content: `breed: ${data.breed}, description: ${data.description}`,
          },
        ],
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      });

      const completionText = chatCompletion.choices[0]?.message?.content || "";
      console.log("Completion Response:", completionText);
      const parsedCompletion = JSON.parse(completionText);
      setChatCompletion(parsedCompletion);
      setDisabled(true);
      console.log("Completion Response:", completionText);
      typingIndex.value = 1;
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      onSuggest();
    } catch (error) {
      console.error("Error during fetch:", error);
      setError(error.message || "Something went wrong");
    }
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(typingIndex.value, {
        duration: 1000,
        easing: Easing.bounce,
      }),
    };
  });

  return (
    <View>
      <LinearGradient
        // Button Linear Gradient
        colors={["rgb(36, 45, 57)", "rgb(0, 0, 0))"]}
        locations={[0.1, 0.9]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        dither={true}
        className="m-6 mt-0 px-3 py-3 rounded-2xl"
      >
        <View className="flex flex-row justify-between items-center">
          <Text className="font-general-sans-semibold p-2 text-white">
            AI Action Suggest
          </Text>
          {/* <FontAwesomeIcon icon={faStarOfLife} spin /> */}
          {loading && !error ? (
            <View className="px-4">
              <ActivityIndicator color="rgb(78, 62, 255)" />
            </View>
          ) : (
            !disabled && (
              <TouchableOpacity
                onPress={() => fetchChatCompletion()}
                disabled={disabled}
              >
                <View>
                  <LinearGradient
                    // Button Linear Gradient
                    colors={["rgb(78, 62, 255)", "rgb(30, 20, 255)"]}
                    locations={[0.1, 0.9]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    className={`p-3 rounded-lg
          `}
                  >
                    <Text className="text-platinum font-general-sans-medium ">
                      Suggest
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
        {chatCompletion && !loading ? (
          <View className="p-3 bg-platinum mt-2 rounded-xl">
            <FlatList
              data={chatCompletion.steps} // Access the steps array
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className={`${index == 0 ? "mt-0" : "mt-2"}`}>
                  <Animated.Text
                    className="font-general-sans-medium"
                    style={animatedStyle}
                  >
                    {index + 1}. {item}
                  </Animated.Text>
                </View>
              )}
            />
          </View>
        ) : error ? (
          <View className="p-3  mt-2 rounded-xl bg-red-500">
            <Text className="font-general-sans-medium text-white">
              Cannot generate action suggestion due to inaccurate description
            </Text>
          </View>
        ) : null}
      </LinearGradient>
    </View>
  );
}
