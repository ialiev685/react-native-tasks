import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AfterTakePictureScreen } from "../nestedScreens";
import { BeforeTakePictureScreen } from "../nestedScreens";

const NestedStack = createNativeStackNavigator();

export const CreatePostsScreen = () => {
  return (
    <NestedStack.Navigator initialRouteName={"AfterPicture"}>
      <NestedStack.Screen
        name="AfterPicture"
        component={AfterTakePictureScreen}
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
      <NestedStack.Screen
        name="BeforePicture"
        component={BeforeTakePictureScreen}
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
    </NestedStack.Navigator>
  );
};
