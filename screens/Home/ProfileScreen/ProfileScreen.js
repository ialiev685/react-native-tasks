import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ProfileScreen = () => {
  return (
    <View style={style.container}>
      <Text>ProfileScreen</Text>
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
