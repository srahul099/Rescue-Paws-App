import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-react";
import AddLocation from "../../components/PetDetails/AddLocation";
import MultiButton from "../../components/Add-Anim/MultiButton";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/FirebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { fetchRiskAssesment } from "../../services/RiskAssesment";
export default function AddNewAnim() {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    breed: "",
    level: "",
    latitude: "",
    longitude: "",
    sex: "",
    description: "",
    tag: "",
    status: false,
  });
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [risk, setRisk] = useState(null);
  const [error, setError] = useState(null);
  const [riskReasoning, setRiskReasoning] = useState(null);
  const { user } = useUser();
  const riskLvl = {
    Low: "bg-green-500",
    Moderate: "bg-yellow-500",
    High: "bg-red-500",
    null: "bg-platinum",
    Unknown: "bg-red-100",
  };
  const riskTag = {
    Low: "Safe but needs ongoing care",
    Moderate: "Requires Timely Intervention",
    High: "Needs Immediate Attention",
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Injured Animal",
      headerTitleStyle: { fontFamily: "generalsans-semibold" },
    });
  }, []);

  const handleChange = (field, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: fieldValue,
    }));
    console.log(formData);
  };

  const handleImagePicker = () => {
    setModalVisible(true);
  };

  const launchCamera = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // handleChange("imageURL", result.assets[0].uri);
    }
  };

  const launchMediaLibrary = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // handleChange("imageURL", result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    const formDataValues = Object.values(formData);
    console.log(formDataValues);
    const allFieldsFilled =
      formDataValues.length === 8 &&
      formDataValues.every((value) => value !== "");

    if (!allFieldsFilled) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    UploadImage();
  };

  const UploadImage = async () => {
    setLoader(true);
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, "/paws" + Date.now() + ".jpg");
    uploadBytes(storageRef, blobImage)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          SaveFormData(downloadUrl);
        });
      });
  };

  const SaveFormData = async (ImageUrl) => {
    const docID = Date.now().toString();
    const date = new Date();
    await setDoc(doc(db, "injured-anim", docID), {
      ...formData,
      time: date.toString(),
      imageURL: ImageUrl,
      userName: user?.firstName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docID,
    });
    setLoader(false);
    ToastAndroid.show("Added Successfully", ToastAndroid.SHORT);
    // add send notification here
    sendNotification(formData);
    router.replace("/(tabs)/home");
  };

  const sendNotification = async (petData) => {
    try {
      const response = await fetch(
        "https://rescuepawsbackendserver.onrender.com/sendNotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "New Injured Animal",
            body: `${petData.breed} is in need of care.`,
            topic: "allUsers",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send notification");
      }
      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleRiskAssesment = async () => {
    setLoading(true);
    setError(null);
    setRisk(null);

    try {
      const riskAssesment = await fetchRiskAssesment(formData);
      setRisk(riskAssesment.risk_level);
      setRiskReasoning(riskAssesment.reasoning);
      if (riskAssesment.error != null) {
        setError(riskAssesment.error);
      } else if (risk != "Unknown" || risk != null || risk != "") {
        handleChange("level", risk);
        handleChange("tag", riskTag[risk]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView className="m-5 " showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={"#fff"} />
      <Text className="font-general-sans-semibold text-lg">
        Enter Pet Information
      </Text>
      <Pressable onPress={handleImagePicker}>
        {!image ? (
          <Image
            source={require("./../../assets/images/image-placeholder.png")}
            className="w-full h-[300px] rounded-xl mt-2"
          />
        ) : (
          <Image
            source={{ uri: image }}
            className="w-full h-[300px] rounded-xl mt-2"
          />
        )}
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          }}
        >
          <View className=" px-5 py-5 bg-white w-[90%] h-fit justify-between rounded-3xl mb-5">
            <View className="flex flex-row items-center justify-start mb-5">
              <FontAwesomeIcon icon={faImage} size={"25px"} />
              <Text className="font-general-sans-bold text-left text-2xl  ml-2">
                Upload a Photo
              </Text>
            </View>
            <Text className="font-general-sans-medium text-left text-[17px] mb-5">
              Would you like to upload a photo using your camera or select one
              from your gallery?
            </Text>
            <TouchableOpacity
              onPress={launchCamera}
              className="p-4 bg-light-orange rounded-t-xl mt-3 w-full items-center"
            >
              <Text className="font-general-sans-medium">Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={launchMediaLibrary}
              className="p-4 bg-light-orange mt-1 w-full items-center"
            >
              <Text className="font-general-sans-medium">Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              className="p-4 bg-light-orange rounded-b-xl mt-1 w-full items-center"
            >
              <Text className="font-general-sans-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">Location*</Text>
        <AddLocation
          onSelect={(value) => {
            handleChange("latitude", value.latitude);
            handleChange("longitude", value.longitude);
          }}
        />
      </View>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">Breed*</Text>
        <TextInput
          className="p-2 mt-1.5 bg-white rounded-md font-general-sans"
          onChangeText={(value) => handleChange("breed", value)}
        />
      </View>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">Gender*</Text>
        <MultiButton
          data={["Male", "Female"]}
          onSelect={(value) => handleChange("sex", value)}
          tag={() => console.log("button clicked")}
        />
      </View>

      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">
          Description*
        </Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          className="p-2 mt-1.5 bg-white rounded-md font-general-sans text-start align-top"
          onChangeText={(value) => handleChange("description", value)}
        />
      </View>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">
          Risk Assesment*
        </Text>
        <TouchableOpacity
          className={`p-4 ${
            error != null ? "bg-red-100" : riskLvl[risk]
          } rounded-md mt-1.5`}
          onPress={handleRiskAssesment}
        >
          {!risk && !loading && !error && (
            <Text className="font-general-sans-medium self-center">
              Assess Risk
            </Text>
          )}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && (
            <Text className="text-red-600 self-center">{error} Try Again</Text>
          )}
          {risk && error == null && (
            <View>
              <Text className="font-general-sans-semibold">{risk}</Text>
              <Text className="font-general-sans-medium mt-1">
                {riskReasoning}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="p-4 bg-charcoal mt-3 rounded-xl mb-4"
        onPress={onSubmit}
        disabled={loader}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text className="text-md text-white font-general-sans-medium text-center">
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
