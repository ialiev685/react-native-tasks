import React from "react";

//навигация

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//форма регистрации
import { RegistrationScreen } from "./Auth/RegistrationScreen";
//форма логирования
import { LoginScreen } from "./Auth/LoginScreen";

const Stack = createNativeStackNavigator();

export const Router = (isAuth) => {
  if (!isAuth)
    return (
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    );
  return <div></div>;
};
