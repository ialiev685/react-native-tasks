import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

//шрифты

import { useFonts } from "expo-font";
//form
import { RegistrationScreen } from "./Screens/RegistrationScreen";

export default function App() {
  const [hasFocus, setHasFocus] = useState(false);

  const [loaded] = useFonts({
    "Roboto-Regular": require("./fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style.container}>
        <ImageBackground
          source={require("./images/rock-bg.png")}
          style={style.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <RegistrationScreen onFocus={hasFocus} />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",

    resizeMode: "cover",
    minWidth: 320,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
