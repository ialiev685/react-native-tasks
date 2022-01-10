import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AfterTakePicture } from "./nestedScreens";
import { BeforeTakePicture } from "./nestedScreens";

const Stack = createNativeStackNavigator();

export const CreatePostsScreen = () => {
  return (
    <Stack.Navigator initialRouteName={"AfterPicture"}>
      <Stack.Screen
        name="AfterPicture"
        component={AfterTakePicture}
        options={{
          title: "Создать публикацию",
          // headerTitle: "Создать публикацию",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
        }}
      />
      <Stack.Screen
        name="BeforePicture"
        component={BeforeTakePicture}
        options={{
          title: "Редактор публикации",
          // headerTitle: "Редактор публикации",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
        }}
      />
    </Stack.Navigator>
  );
};
