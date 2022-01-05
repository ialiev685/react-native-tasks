import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PostsScreen = () => {
  return (
    <View style={style.container}>
      <Text>PostsScreen</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});