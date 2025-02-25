import React, { useEffect } from "react";
import Header from "../../components/Adopt/Header";
import PetListByCategory from "../../components/Adopt/PetListByCategory";

import { SignedIn } from "@clerk/clerk-react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Adopt() {
  return (
    <SafeAreaView className="px-[20px] flex-1">
      <SignedIn>
        <Header type={"adopt"} />
        <PetListByCategory />
      </SignedIn>
    </SafeAreaView>
  );
}
