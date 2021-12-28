import { View, StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
//кнопка
import { ButtonSubmit } from "../../components/ButtonSubmit";

const initFocus = {
  login: "#E8E8E8",
  email: "#E8E8E8",
  password: "#E8E8E8",
};

export const RegistrationScreen = ({ onFocus }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [changeBorder, setChangeBorder] = useState(initFocus);

  const hanlerFocus = (key) => {
    setChangeBorder((prevState) => ({ ...prevState, ...key }));
  };

  return (
    <View style={{ ...style.form, paddingTop: onFocus ? 10 : 92 }}>
      <Text style={style.form__title}>Регистрация</Text>

      <TextInput
        style={{
          ...style.form__input,
          borderColor: changeBorder.login,
        }}
        autoComplete="off"
        placeholder="Логин"
        onFocus={() => hanlerFocus({ login: "#FF6C00" })}
        onBlur={() => hanlerFocus({ login: "#E8E8E8" })}
      />
      <TextInput
        style={{
          ...style.form__input,
          borderColor: changeBorder.email,
        }}
        autoComplete="off"
        onFocus={() => hanlerFocus({ email: "#FF6C00" })}
        onBlur={() => hanlerFocus({ email: "#E8E8E8" })}
        placeholder="Адрес электронной почты"
      />

      <View
        style={{
          ...style.form__input,
          borderColor: changeBorder.password,
          marginBottom: 43,
        }}
      >
        <TextInput
          autoComplete="off"
          placeholder="Пароль"
          secureTextEntry={!showPassword}
          onFocus={() => hanlerFocus({ password: "#FF6C00" })}
          onBlur={() => hanlerFocus({ password: "#E8E8E8" })}
        />
        <Text
          style={style.input__button}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Скрыть" : "Показать"}
        </Text>
      </View>

      <ButtonSubmit text={"Зарегистрироваться"} />

      <Text style={style.form__link}>Уже есть аккаунт? Войти</Text>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    alignItems: "center",

    minWidth: 320,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#fff",

    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20,
  },
  form__title: {
    fontFamily: "Roboto-Medium",

    fontSize: 30,
    lineHeight: 35,

    marginBottom: 32,
  },
  form__input: {
    position: "relative",

    width: "100%",
    height: 50,

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",

    padding: 16,

    fontSize: 16,
    lineHeight: 19,

    marginBottom: 16,
  },

  input__button: {
    position: "absolute",
    top: 0,
    right: 0,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
    padding: 16,
  },
  form__link: {
    fontFamily: "Roboto-Regular",

    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",

    marginTop: 16,
  },
});
