import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IFormLayoutprops {
  children: React.ReactNode;
}

export default function FormLayout({ children }: IFormLayoutprops) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: 312,
    alignSelf: "center"
  }
});
