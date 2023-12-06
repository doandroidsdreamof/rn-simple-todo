import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";

import LoginButton from "../components/LoginButton";

type RootStackParamList = {
  Home: undefined;
  Place: { placeId: number };
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  }
});
