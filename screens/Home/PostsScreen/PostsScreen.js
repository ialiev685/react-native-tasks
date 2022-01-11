import React from "react";

// import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//компоненты
import { DefaultPostsScreen } from "../nestedScreens";
import { CommentsScreen } from "../nestedScreens";
import { MapScreen } from "../nestedScreens";

const NestedStack = createNativeStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleAlign: "center",

        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,

          color: "#212121",
        },
      }}
      initialRouteName={"DefaultPosts"}
    >
      <NestedStack.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{ title: "Публикации" }}
      />
      <NestedStack.Screen
        name="Comment"
        component={CommentsScreen}
        options={{ title: "Комментарии" }}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </NestedStack.Navigator>
  );
};
