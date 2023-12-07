import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { Link } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Spinner, Text } from "@ui-kitten/components";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { toFormikValidationSchema } from "zod-formik-adapter";

import useToggleVisible from "../hooks/useToggleVisible";
import FormLayout from "../layouts/FormLayout";
import { supabase } from "../lib/supabase";
import { ISignin, loginSchema } from "../schemas/loginShema";

type RootStackParamList = {
  SignIn: undefined;
  Place: { placeId: number };
};

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: SignInScreenProps) {
  const { isVisible, renderIcon } = useToggleVisible();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: (values) => {
      signInWithEmail(values);
    }
  });
  GoogleSignin.configure({
    scopes: [process.env.GOOGLE_SCOPE as string],
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID
  });

  async function signInWithEmail(value: ISignin) {
    console.log("🚀 ~ file: SignIn.tsx:42 ~ signInWithEmail ~ value:", value);
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword(value);
      console.log("🚀 ~ file: SignIn.tsx:45 ~ signInWithEmail ~ error:", error);
      if (error) Alert.alert(error.message);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FormLayout>
      <Text status="basic" style={styles.title} category="h3">
        Sign in
      </Text>
      <View style={styles.inputContainer}>
        <Input onChangeText={formik.handleChange("email")} onBlur={formik.handleBlur("email")} placeholder="Email" />
        {formik.touched.email && formik.errors.email ? <Text style={styles.errorText}>{formik.errors.email}</Text> : null}
        <Input
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          accessoryRight={renderIcon}
          secureTextEntry={isVisible}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password ? <Text style={styles.errorText}>{formik.errors.password}</Text> : null}
      </View>
      <View style={[styles.buttonContainer, styles.mt20]}>
        <Button disabled={loading} onPress={() => formik.handleSubmit()} style={styles.button} size="small">
          {!loading ? (
            "login"
          ) : (
            <View>
              <Spinner size="small" />
            </View>
          )}
        </Button>
      </View>
      <View style={styles.linkContainer}>
        <Text>dont have an account?</Text>
        <Link to={{ screen: "SignUp" }}>
          <Text status="primary">sign up</Text>
        </Link>
      </View>
      <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => console.log("google")} />
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
    gap: 15
  },
  button: {
    margin: 2,
    flex: 1
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  title: {
    top: -45
  },
  errorText: {
    marginRight: "auto",
    color: "red",
    fontSize: 11
  },
  mt20: {
    marginTop: 20
  }
});
