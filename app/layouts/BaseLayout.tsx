// BaseLayout.js
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import { IWrapperProps } from "../types/interface";

const BaseLayout = ({ children }: IWrapperProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20
  }
});

export default BaseLayout;
