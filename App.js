import React, { useState } from "react";

//навигация
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

//шрифты
import { useFonts } from "expo-font";

//router
import { Router } from "./screens/Router";

// const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  const [loaded] = useFonts({
    "Roboto-Regular": require("./fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./fonts/Roboto/Roboto-Bold.ttf"),
  });

  const route = Router(isAuth);

  if (!loaded) {
    return null;
  }
  return <NavigationContainer>{route}</NavigationContainer>;
}
