import { View, Text } from "react-native";
import React from "react";
import {
  faCalendarDays,
  faDog,
  faMars,
  faSyringe,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View className="m-6 mr-8 mt-0">
      <View className="flex flex-row ">
        <PetSubInfoCard
          icon={faCalendarDays}
          heading={"Age"}
          value={pet?.age + " Years"}
          mr={"2"}
        />
        <PetSubInfoCard
          icon={faDog}
          heading={"Breed"}
          value={pet?.breed}
          mr={"0"}
        />
      </View>
      <View className="mt-2 flex flex-row ">
        <PetSubInfoCard
          icon={pet.sex == "Male" ? faMars : faVenus}
          heading={"Gender"}
          value={pet?.sex}
          mr={"2"}
        />
        <PetSubInfoCard
          icon={faSyringe}
          heading={"Vaccine"}
          value={pet?.vaccine}
          mr={"0"}
        />
      </View>
    </View>
  );
}
