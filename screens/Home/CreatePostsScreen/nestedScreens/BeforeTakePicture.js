import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";

//камера
import { Camera } from "expo-camera";
//иконка
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
//кнопка

export const BeforeTakePicture = () => {
  const [hasPermissionCamera, setHasPermissionCamera] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermissionCamera(status === "granted");
      console.log(status);
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    console.log(uri);
    setPhoto(uri);
  };

  if (!hasPermissionCamera) {
    return (
      <View style={style.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <ScrollView style={style.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <Camera
          style={style.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => setCamera(ref)}
          ratio={"1:1"}
        >
          <View style={style.battonContainer}>
            <TouchableOpacity onPress={takePhoto}>
              <FontAwesome name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Camera>
        <Text style={{ marginBottom: 48 }}>Загрузить фото</Text>
        <TextInput placeholder="Название..." style={style.input} />
        <View style={[style.input, style.inputLocation]}>
          <EvilIcons
            name="location"
            size={24}
            color="#BDBDBD"
            style={style.iconLocation}
          />
          <TextInput placeholder="Местность..." />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 16,
  },
  camera: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 32,

    // height: "45%",
    height: 240,

    borderRadius: 8,
  },

  battonContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",

    borderRadius: 50,
  },

  input: {
    position: "relative",

    paddingBottom: 15,
    marginBottom: 32,

    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  iconLocation: {
    position: "absolute",
    top: 5,
    left: 0,
  },

  inputLocation: {
    paddingLeft: 24,
  },
});
