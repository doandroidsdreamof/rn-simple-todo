import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { supabase } from "./lib/supabase";
import HomeScreen from "./screens/Home";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import { useAppSelector } from "./store/hooks";
import { store } from "./store/store";

type ScreenLists = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<ScreenLists>();

function App() {
  const isUserSignIn = useAppSelector((state) => state.user.isSignedIn);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log("🚀 ~ file: index.tsx:24 ~ App ~ session:", session);
  }, []);

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center"
        }}>
        {isUserSignIn ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Todo App"
            }}
          />
        ) : (
          <>
            <Stack.Screen name="SignIn" options={{ title: "Sign in" }} component={SignInScreen} />
            <Stack.Screen name="SignUp" options={{ title: "Sign up" }} component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <App />
      </ApplicationProvider>
    </Provider>
  );
};
