import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { IWrapperProps } from "../types/interface";

export default function FormLayout({ children }: IWrapperProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 44,
    alignSelf: "center",
    backgroundColor: "white"
  }
});
