import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface ILoginButtonProps {
  text: string;
  name: "google" | "github" | "facebook";
  status: string;
  handleLogin: () => void;
}

export default function LoginButton({ name, text, status, handleLogin }: ILoginButtonProps) {
  return (
    <Button
      onPress={() => handleLogin()}
      accessoryLeft={<FontAwesome size={18} color="white" name={name} />}
      style={styles.button}
      status={status}>
      {text}
    </Button>
  );
}
const styles = StyleSheet.create({
  button: {
    gap: -15,
    width: 250
  }
});
