import React, { useEffect } from "react";
import { Image } from "react-native";

// import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

//компоненты
import { DefaultPostsScreen } from "../nestedScreens";
import { CommentsScreen } from "../nestedScreens";
import { MapScreen } from "../nestedScreens";

//икнонка
import { Feather as LogOut } from "@expo/vector-icons";
import ArrrowIcon from "../../../components/ArrrowIcon";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchLogOutUser } from "../../../redux/auth";

const NestedStack = createNativeStackNavigator();

export const PostsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

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
        options={{
          title: "Публикации",
          headerRight: () => (
            <LogOut
              style={{ marginRight: 16 }}
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={() => dispatch(fetchLogOutUser())}
            />
          ),
        }}
      />
      <NestedStack.Screen
        name="Comment"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerLeft: () => (
            <ArrrowIcon
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerLeft: () => (
            <ArrrowIcon
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </NestedStack.Navigator>
  );
};
