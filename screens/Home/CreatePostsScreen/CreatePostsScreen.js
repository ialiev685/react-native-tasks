import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const CreatePostsScreen = () => {
  return (
    <View style={style.container}>
      <Text>CreatePostsScreen</Text>
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
