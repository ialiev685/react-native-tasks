import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
//кнопка
import { ButtonSubmit } from "../../../components/ButtonSubmit";

const initFocus = {
  login: "#E8E8E8",
  email: "#E8E8E8",
  password: "#E8E8E8",
};

const initData = {
  login: "",
  email: "",
  password: "",
};

const initDeminsion = {
  width: Dimensions.get("window").width - 16 * 2,
  paddingBottom: Dimensions.get("window").height > 560 ? 78 : 10,
};

export const RegistrationScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [changeBorder, setChangeBorder] = useState(initFocus);
  const [hasFocus, setHasFocus] = useState(false);
  const [data, setData] = useState(initData);

  const [dimensions, setDimensions] = useState(initDeminsion);

  useEffect(() => {
    const onChangeDeminsion = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      const height = Dimensions.get("window").height;
      const paddingBottom = height > 560 ? 78 : 10;
      setDimensions((prevState) => ({ ...prevState, width, paddingBottom }));
    };

    Dimensions.addEventListener("change", onChangeDeminsion);

    Keyboard.addListener("keyboardDidHide", handleHideKeyboard);
    Keyboard.addListener("keyboardDidShow", handleShowKeyboard);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide", handleHideKeyboard);
      Keyboard.removeAllListeners("keyboardDidShow", handleShowKeyboard);
      Dimensions.removeEventListener("change", onChangeDeminsion);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../../images/rock-bg.png")}
        style={style.image}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View style={style.form}>
            <View
              style={{
                width: dimensions.width,
                paddingTop: hasFocus ? 32 : 92,
                paddingBottom: hasFocus ? 32 : dimensions.paddingBottom,
              }}
            >
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
                value={data.login}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, login: value }))
                }
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
                value={data.email}
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
                  value={data.password}
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
                  <ButtonSubmit
                    text={"Зарегистрироваться"}
                    onClick={handleSubmit}
                  />

                  <Text
                    style={style.form__link}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Уже есть аккаунт? Войти
                  </Text>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,

    flex: 1,
    justifyContent: "flex-end",

    resizeMode: "cover",
    minWidth: 320,
  },
  form: {
    alignItems: "center",

    minWidth: 320,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#fff",
  },

  form__title: {
    fontFamily: "Roboto-Medium",

    fontSize: 30,
    lineHeight: 35,

    marginBottom: 32,

    textAlign: "center",
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
