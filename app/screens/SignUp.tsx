import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { Link } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Input, Text, Button, Spinner } from "@ui-kitten/components";
import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { toFormikValidationSchema } from "zod-formik-adapter";

import useToggleVisible from "../hooks/useToggleVisible";
import FormLayout from "../layouts/FormLayout";
import { supabase } from "../lib/supabase";
import { IRegister, registerSchema } from "../schemas/registerSchema";

type RootStackParamList = {
  SignUp: undefined;
  Place: { placeId: number };
};

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const { isVisible, renderIcon } = useToggleVisible();
  const { isVisible: isVisibleConfirmPassword, renderIcon: renderIconConfirmPassword } = useToggleVisible();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: (values) => {
      createUser(values);
    }
  });
  GoogleSignin.configure({
    scopes: [process.env.GOOGLE_SCOPE as string],
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID
  });

  const createUser = async (value: IRegister) => {
    try {
      setLoading(true);

      const {
        data: { session },
        error
      } = await supabase.auth.signUp(value);
      console.log("🚀 ~ file: SignUp.tsx:48 ~ createUser ~ session:", session);
      if (error) Alert.alert(error.message);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormLayout>
      <Text status="basic" style={styles.title} category="h3">
        Create an account
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

        <Input
          onChangeText={formik.handleChange("confirmPassword")}
          onBlur={formik.handleBlur("confirmPassword")}
          accessoryRight={renderIconConfirmPassword}
          secureTextEntry={isVisibleConfirmPassword}
          placeholder="Confirm password"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
        ) : null}
      </View>
      <View style={[styles.buttonContainer, styles.mt20]}>
        <Button disabled={loading} onPress={() => formik.handleSubmit()} style={styles.button} size="small">
          {!loading ? (
            "register"
          ) : (
            <View>
              <Spinner size="small" />
            </View>
          )}
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
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  title: {
    top: -45
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 15
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
