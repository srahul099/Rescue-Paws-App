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
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import DropDownMenu from "../../components/DropDownMenu";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import AddLocation from "../../components/PetDetails/AddLocation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    breed: "",
    category: "",
    age: "",
    latitude: "",
    longitude: "",
    sex: "",
    vaccine: "",
    about: "",
    status: false,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, "category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const handleImagePicker = () => {
    setModalVisible(true);
  };

  const launchCamera = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
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
      aspect: [4, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // handleChange("imageURL", result.assets[0].uri);
    }
  };

  const handleChange = (field, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: fieldValue,
    }));
    console.log(formData);
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
      headerTitleStyle: { fontFamily: "generalsans-semibold" },
    });
    GetCategories();
  }, []);
  //
  //
  //
  //
  const onSubmit = () => {
    const formDataValues = Object.values(formData);
    const allFieldsFilled =
      formDataValues.length == 9 &&
      formDataValues.every((value) => value !== "");

    if (!allFieldsFilled) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    UploadImage();
  };

  //upload image
  //
  //
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
  // Save data
  //
  //
  const SaveFormData = async (ImageUrl) => {
    const docID = Date.now().toString();
    const date = new Date();
    await setDoc(doc(db, "pet", docID), {
      ...formData,
      imageURL: ImageUrl,
      time: date.toString(),
      userName: user?.firstName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docID,
    });
    setLoader(false);
    router.replace("/(tabs)/adopt");
  };
  return (
    <ScrollView className="m-5 " showsVerticalScrollIndicator={false}>
      <Text className="font-general-sans-semibold text-lg">
        Enter Pet Information
      </Text>
      <Pressable onPress={handleImagePicker}>
        {!image ? (
          <Image
            source={require("./../../assets/images/image-placeholder.png")}
            className="w-full h-[450px] rounded-xl mt-2"
          />
        ) : (
          <Image
            source={{ uri: image }}
            className="w-full h-[450px] rounded-xl mt-2"
          />
        )}
      </Pressable>
      <Modal
        animationType="fade"
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
        <Text className="text-[15px] font-general-sans-medium">Category*</Text>
        <DropDownMenu
          field="Category"
          data={["Stray Dog", "Pet Dog"]}
          onSelect={(value) => handleChange("category", value)}
          zIndex={9}
        />
      </View>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">Age*</Text>
        <TextInput
          keyboardType="numeric"
          className="p-2 mt-1.5 bg-white rounded-md font-general-sans"
          onChangeText={(value) => handleChange("age", value)}
        />
      </View>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">Gender*</Text>
        <DropDownMenu
          field="Gender"
          data={["Male", "Female"]}
          onSelect={(value) => handleChange("sex", value)}
          zIndex={10}
        />
      </View>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">
          Vaccinated*
        </Text>
        <DropDownMenu
          field="Option"
          data={["Vaccinated", "Not Sure", "Not Vaccinated"]}
          onSelect={(value) => handleChange("vaccine", value)}
          zIndex={9}
        />
      </View>
      <View className="mt-5">
        <Text className="text-[15px] font-general-sans-medium">About*</Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          className="p-2 mt-1.5 bg-white rounded-md font-general-sans text-start align-top"
          onChangeText={(value) => handleChange("about", value)}
        />
      </View>
      <TouchableOpacity
        className="p-4 bg-btn-orange mt-3 rounded-xl mb-4"
        onPress={onSubmit}
        disabled={loader}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text className="text-md font-general-sans-medium text-center">
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
