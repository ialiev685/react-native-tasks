import React from "react";
import { View, Text } from "react-native";

export const MapScreen = ({ route }) => {
  console.log("map", route.params);
  return <Text>MapScreen</Text>;
};
