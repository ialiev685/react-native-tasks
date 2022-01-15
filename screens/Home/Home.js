import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

//иконки
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ArrrowIcon from "../../components/ArrrowIcon";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarStyle: { height: 71 },
        // tabBarHideOnKeyboard: true,

        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          color: "#212121",
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="appstore-o" size={24} color="#4d4d4d" />;
          },
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <ArrrowIcon
              onPress={() => navigation.navigate("Posts")}
              style={{ marginLeft: 16 }}
            />
          ),

          headerTitle: "Создать публикацию",
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={style.addButton}>
                <Ionicons name="add" size={size} color="#FFFFFF" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Профиль",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user" size={24} color="#4d4d4d" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 70,
    height: 40,

    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
  },
});
