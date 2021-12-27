import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
} from "react-native";

//шрифты

import { useFonts } from "expo-font";
//form
import { RegistrationScreen } from "./RegistrationScreen/RegistrationScreen";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    "Roboto-Regular": require("./fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
    // return (
    //   <AppLoading
    //     startAsync={loadFonts}
    //     onFinish={() => setIsReady(true)}
    //     onError={console.warn}
    //   />

    // );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style.container}>
        <ImageBackground
          source={require("./images/rock-bg.png")}
          style={style.image}
        >
          <RegistrationScreen />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    minWidth: 320,
    minHeight: 812,
  },
  container: {
    flex: 1,
  },
});
