import { View, StyleSheet, Text, TextInput, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
//кнопка
import { ButtonSubmit } from "../../components/ButtonSubmit";

const initFocus = {
  email: "#E8E8E8",
  password: "#E8E8E8",
};

const initData = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [changeBorder, setChangeBorder] = useState(initFocus);
  const [hasFocus, setHasFocus] = useState(false);
  const [data, setData] = useState(initData);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handleHideKeyboard);
    Keyboard.addListener("keyboardDidShow", handleShowKeyboard);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide", handleHideKeyboard);
      Keyboard.removeAllListeners("keyboardDidShow", handleShowKeyboard);
    };
  }, []);

  const handleHideKeyboard = (e) => {
    setHasFocus(false);
  };
  const handleShowKeyboard = (e) => {
    setHasFocus(true);
  };

  const hanlerFocus = (key) => {
    setChangeBorder((prevState) => ({ ...prevState, ...key }));
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    setHasFocus(false);
    console.log(data);
  };

  return (
    <View
      style={{
        ...style.form,
        paddingBottom: hasFocus ? 32 : 111,
      }}
    >
      <Text style={style.form__title}>Войти</Text>

      <TextInput
        style={{
          ...style.form__input,
          borderColor: changeBorder.email,
        }}
        autoComplete="off"
        onFocus={() => hanlerFocus({ email: "#FF6C00" })}
        onBlur={() => hanlerFocus({ email: "#E8E8E8" })}
        placeholder="Адрес электронной почты"
        onChangeText={(value) =>
          setData((prevState) => ({ ...prevState, email: value }))
        }
      />

      <View
        style={{
          ...style.form__input,
          borderColor: changeBorder.password,
          marginBottom: hasFocus ? 0 : 43,
        }}
      >
        <TextInput
          autoComplete="off"
          placeholder="Пароль"
          secureTextEntry={!showPassword}
          onFocus={() => hanlerFocus({ password: "#FF6C00" })}
          onBlur={() => hanlerFocus({ password: "#E8E8E8" })}
          onChangeText={(value) =>
            setData((prevState) => ({ ...prevState, password: value }))
          }
        />
        <Text
          style={style.input__button}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Скрыть" : "Показать"}
        </Text>
      </View>
      {!hasFocus && (
        <View style={style.wrapperButtonAndLink}>
          <ButtonSubmit text={"Войти"} onClick={handleSubmit} />

          <Text style={style.form__link}>Нет аккаунта? Зарегистрироваться</Text>
        </View>
      )}
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

    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
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
    textAlign: "center",

    color: "#1B4371",

    marginTop: 16,
  },

  wrapperButtonAndLink: {
    width: "100%",
  },
});
