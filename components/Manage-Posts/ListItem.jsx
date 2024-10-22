import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Vibration,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faCircleCheck,
  faCircleXmark,
  faGear,
  faSquarePen,
  faTrash,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function ListItem({ anim, dbname, refereshData }) {
  const postDate = moment(anim.time).format("DD MMMM YYYY");
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("initial");
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (status) => {
    setLoading(true);
    const docRef = doc(db, dbname, anim.id);
    await updateDoc(docRef, {
      status: status,
    });
    setLoading(false);
    setModal(!modal);

    setModalType("initial");
    refereshData();
  };

  const handleDelete = async () => {
    setLoading(true);
    const docRef = doc(db, dbname, anim.id);
    await deleteDoc(docRef);
    setModal(!modal);
    setModalType("initial");
    setLoading(false);
    refereshData();
  };
  return (
    <TouchableOpacity
      onLongPress={() => {
        Vibration.vibrate(50);
        setModal(true);
        setModalType("initial");
      }}
      onPress={() =>
        router.push({
          pathname: `${anim.level ? "/anim-details" : "/pet-details"}`,
          params: anim,
        })
      }
      className="bg-white rounded-2xl px-3 py-3 mb-3 flex flex-row"
    >
      <View className="mr-3">
        <Image
          source={{ uri: anim?.imageURL }}
          className="h-[100px] w-[100px] object-cover rounded-lg"
        />
      </View>
      <View className="flex fllex-col">
        <Text className="text-lg p-1 pt-0 font-general-sans-semibold">
          Breed: {anim?.breed}
        </Text>
        <Text className="text-sm px-1 pb-1 font-general-sans-medium text-smoke">
          Posted On: {postDate}
        </Text>
        <View className="flex flex-row px-1 items-center">
          <Text className="text-sm font-general-sans-medium text-smoke">
            Status:{" "}
          </Text>
          {anim?.status ? (
            <FontAwesomeIcon icon={faCircleCheck} color="green" />
          ) : (
            <FontAwesomeIcon icon={faCircleXmark} color="red" />
          )}
        </View>
      </View>
      {modal ? (
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
            setModalType("initial");
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
              {modalType == "initial" ? (
                <View>
                  <View className="flex flex-row items-center justify-start mb-5">
                    <FontAwesomeIcon icon={faGear} size={"25px"} />
                    <Text className="font-general-sans-bold text-left text-2xl  ml-2">
                      Choose an action
                    </Text>
                  </View>
                  <Text className="font-general-sans-medium text-left text-[17px] mb-5">
                    Choose an option to update the post status or delete the
                    post.
                  </Text>
                  <View className="w-full">
                    <TouchableOpacity
                      className="p-4 bg-light-orange rounded-t-xl mt-3 w-full items-center"
                      onPress={() => setModalType("setstatus")}
                    >
                      <Text className="font-general-sans-medium">
                        Set Status
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="p-4 bg-light-orange mt-1 w-full items-center"
                      onPress={() => setModalType("deletepost")}
                    >
                      <Text className="font-general-sans-medium">
                        Delete Post
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModal(!modal);
                        setModalType("Initial");
                      }}
                      className="p-4 bg-light-orange rounded-b-xl mt-1 w-full items-center"
                    >
                      <Text className="font-general-sans-medium">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : modalType === "setstatus" ? (
                <View>
                  <View className="flex flex-row items-center justify-start mb-5">
                    <FontAwesomeIcon icon={faGear} size={"25px"} />
                    <Text className="font-general-sans-bold text-left text-2xl  ml-2">
                      Set Status
                    </Text>
                  </View>
                  <Text className="font-general-sans-medium text-left text-[17px] mb-5">
                    Update the post status to mark whether the dog has been
                    rescued or adopted.
                  </Text>
                  <View className="w-full">
                    {!anim.status ? (
                      <TouchableOpacity
                        className="p-4 bg-green-400 rounded-xl mt-3 w-full"
                        onPress={() => handleUpdate(true)}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator size={"small"} color={"black"} />
                        ) : (
                          <View className="flex flex-row justify-center items-center">
                            <FontAwesomeIcon icon={faCheck} color="white" />
                            <Text className="font-general-sans-medium ml-1 text-white">
                              Resolved
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        className="p-4 bg-red-500 rounded-xl mt-1 w-full"
                        onPress={() => handleUpdate(false)}
                        loading={loading}
                      >
                        {loading ? (
                          <ActivityIndicator size={"small"} color={"black"} />
                        ) : (
                          <View className="flex flex-row justify-center items-center">
                            <FontAwesomeIcon icon={faXmark} color="white" />
                            <Text className="font-general-sans-medium text-white ml-1">
                              Pending
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setModal(!modal);
                        setModalType("Initial");
                      }}
                      className="p-4 rounded-b-xl mt-1 w-full items-center"
                    >
                      <Text className="font-general-sans-medium text-dark-orange">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : modalType == "deletepost" ? (
                <View>
                  <View className="flex flex-row items-center justify-start mb-5">
                    <FontAwesomeIcon icon={faTrash} size={"25px"} color="red" />
                    <Text className="font-general-sans-bold text-left text-2xl  ml-2 text-[#FF0000]">
                      Delete Post
                    </Text>
                  </View>
                  <Text className="font-general-sans-medium text-left text-[17px] mb-5">
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                  </Text>
                  <View className="w-full">
                    <TouchableOpacity
                      className="p-4 bg-red-500 rounded-xl mt-1 w-full items-center flex flex-row justify-center"
                      onPress={() => handleDelete()}
                    >
                      {loading ? (
                        <ActivityIndicator size={"small"} color={"black"} />
                      ) : (
                        <Text className="font-general-sans-medium text-white">
                          Delete
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModal(!modal);
                        setModalType("Initial");
                      }}
                      className="p-4 rounded-b-xl mt-1 w-full items-center"
                    >
                      <Text className="font-general-sans-medium text-dark-orange">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </Modal>
      ) : null}
    </TouchableOpacity>
  );
}
