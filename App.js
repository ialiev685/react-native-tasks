import React from "react";

//навигация
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

//шрифты
import { useFonts } from "expo-font";

//router
import { Router } from "./screens/Router";

// const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Regular": require("./fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./fonts/Roboto/Roboto-Bold.ttf"),
  });

  const route = Router(false);

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      {route}
      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "Registration", headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
