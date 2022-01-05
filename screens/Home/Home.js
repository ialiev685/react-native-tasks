import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

//иконки
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator initialRouteName="Posts">
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: "Публикации",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,

            color: "#212121",
          },
          title: "",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="appstore-o" size={18} color="#4d4d4d" />;
          },
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerTitle: "Создать публикацию",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
          title: "",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={style.addButton}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
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
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            color: "#212121",
          },
          title: "",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user" size={18} color="#4d4d4d" />;
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
