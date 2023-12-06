import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import { Link } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ZodIssue } from "zod";

import LoginButton from "../components/LoginButton";
import useToggleVisible from "../hooks/useToggleVisible";
import FormLayout from "../layouts/FormLayout";
import { supabase } from "../lib/supabase";
import { loginSchema, validateLogin } from "../schemas/loginShema";

type RootStackParamList = {
  SignIn: undefined;
  Place: { placeId: number };
};

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: SignInScreenProps) {
  const { isVisible, toggleVisible, renderIcon } = useToggleVisible();
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: "576679274815-vhkcjasr203115t6am3r7cba2e3dlde9.apps.googleusercontent.com"
  });

  const handleSubmit = () => {
    const parsedData = loginSchema.safeParse(formData);
    console.log("🚀 ~ file: SignIn.tsx:39 ~ handleSubmit ~ parsedData:", parsedData);
    const { issues } = parsedData.error;
    console.log("🚀 ~ file: SignIn.tsx:41 ~ handleSubmit ~ issues:", issues);
  };

  const getError = (path: string) => {
    const error = errors.find((error) => error.path === path);

    return error ? <small className="text-red-500">{error?.message}</small> : null;
  };

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("🚀 ~ file: SignInScreen.tsx:31 ~ handleLogin ~ userInfo:", userInfo);
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken
        });
        console.log(error);
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      console.log("🚀 ~ file: SignInScreen.tsx:42 ~ handleLogin ~ error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <FormLayout>
      <Text status="basic" style={styles.title} category="h3">
        Sign in
      </Text>
      <View style={styles.inputContainer}>
        <Input onChangeText={(text) => setFormData({ ...formData, email: text })} placeholder="Email" />
        <Input
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          accessoryRight={renderIcon}
          secureTextEntry={isVisible}
          placeholder="Password"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit} style={styles.button} size="small">
          login
        </Button>
      </View>
      <View style={styles.linkContainer}>
        <Text>dont have an account?</Text>
        <Link to={{ screen: "SignUp" }}>
          <Text status="primary">sign up</Text>
        </Link>
      </View>
      <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => handleLogin()} />
    </FormLayout>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    gap: 4,
    marginVertical: 7
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10
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
  }
});
