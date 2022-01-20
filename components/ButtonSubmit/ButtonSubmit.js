import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ButtonSubmit = ({
  text = "кнопка",
  onClick,
  color = "#FF6C00",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...style.button, backgroundColor: color }}
      onPress={onClick}
    >
      <Text style={style.button__text}>{text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,

    borderWidth: 0,

    backgroundColor: "#FF6C00",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 100,
  },
  button__text: {
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
});
