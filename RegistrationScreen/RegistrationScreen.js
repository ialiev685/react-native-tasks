import { View, StyleSheet, Text, TextInput } from "react-native";

import React from "react";

export const RegistrationScreen = () => {
  return (
    <View style={style.form}>
      <Text style={style.title}>Регистрация</Text>
      <TextInput autoComplete="off" placeholder="Логин" />
      <TextInput autoComplete="off" placeholder="Адрес электронной почты" />
      <TextInput autoComplete="off" placeholder="Пароль" />
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    display: "flex",

    justifyContent: "center",
    alignItems: "center",

    minWidth: 320,
    height: 549,

    marginTop: "auto",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#fff",
  },

  title: {
    fontFamily: "Roboto-Medium",

    fontSize: 30,
    lineHeight: 35,
  },
});
