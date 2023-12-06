import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { Link } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Input, Text, Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

import useToggleVisible from "../hooks/useToggleVisible";
import FormLayout from "../layouts/FormLayout";

type RootStackParamList = {
  SignUp: undefined;
  Place: { placeId: number };
};

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const { isVisible, renderIcon } = useToggleVisible();
  const { isVisible: isVisibleConfirmPassword, renderIcon: renderIconConfirmPassword } = useToggleVisible();

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: "576679274815-vhkcjasr203115t6am3r7cba2e3dlde9.apps.googleusercontent.com"
  });

  return (
    <FormLayout>
      <Text status="basic" style={styles.title} category="h3">
        Create an account
      </Text>
      <View style={styles.inputContainer}>
        <Input placeholder="Email" />
        <Input accessoryRight={renderIcon} secureTextEntry={isVisible} placeholder="Password" />
        <Input accessoryRight={renderIconConfirmPassword} secureTextEntry={isVisibleConfirmPassword} placeholder="Confirm password" />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} size="small">
          register
        </Button>
      </View>
      <View style={styles.linkContainer}>
        <Text>already have an account?</Text>
        <Link to={{ screen: "SignIn" }}>
          <Text status="primary">sign in</Text>
        </Link>
      </View>
      <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => console.log("ok")} />
    </FormLayout>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    gap: 4,
    marginVertical: 7
  },
  button: {
    margin: 2,
    flex: 1
  },
  buttonContainer: {
    flexDirection: "row"
  },
  title: {
    marginBottom: 10
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10
  }
});
