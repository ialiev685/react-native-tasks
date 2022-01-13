import React, { useEffect } from "react";

// import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

//компоненты
import { DefaultPostsScreen } from "../nestedScreens";
import { CommentsScreen } from "../nestedScreens";
import { MapScreen } from "../nestedScreens";

const NestedStack = createNativeStackNavigator();

export const PostsScreen = ({ route, navigation }) => {
  useEffect(() => {
    const currentRoute = getFocusedRouteNameFromRoute(route);
    if (currentRoute === "Comment" || currentRoute === "Map") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex", height: 71 } });
    }
  }, [route]);

  return (
    <NestedStack.Navigator
      screenOptions={{
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
