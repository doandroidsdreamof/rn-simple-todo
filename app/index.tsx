import * as eva from "@eva-design/eva";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import "react-native-gesture-handler";

import DrawerContent from "./components/DrawerContent";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomeScreen from "./screens/Home";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";

type ScreenLists = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Drawer = createDrawerNavigator<ScreenLists>();

function App() {
  const { session } = useAuth();

  return (
    <NavigationContainer independent>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{ drawerPosition: "left" }}>
        {session ? (
          <>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Todo App"
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen name="SignIn" options={{ title: "Sign in" }} component={SignInScreen} />
            <Drawer.Screen name="SignUp" options={{ title: "Sign up" }} component={SignUpScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <App />
      </ApplicationProvider>
    </AuthProvider>
  );
};
