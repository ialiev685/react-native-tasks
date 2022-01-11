import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//инициализации камеры при повторном возврате к ней
import { useIsFocused } from "@react-navigation/native";
//камера
import { Camera } from "expo-camera";
//место хранения
import * as MediaLibrary from "expo-media-library";
//иконка
import { FontAwesome } from "@expo/vector-icons";

export const AfterTakePicture = ({ navigation }) => {
  const [hasPermissionCamera, setHasPermissionCamera] = useState(false);
  const [hasPermissionLibrary, setHasPermissionLibrary] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: statusSave } =
        await MediaLibrary.requestPermissionsAsync();

      setHasPermissionLibrary(statusSave === "granted");
      setHasPermissionCamera(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);

      setPhoto(uri);

      navigation.navigate("BeforePicture", { uri });
    } catch (error) {
      console.log(error);
    }
  };

  if (!hasPermissionCamera) {
    return (
      <View style={style.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      {isFocused && (
        <Camera
          style={style.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => setCamera(ref)}
          // ratio={"1:1"}
        >
          <TouchableOpacity onPress={takePhoto}>
            <View style={style.battonContainer}>
              <FontAwesome name="camera" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </Camera>
      )}
      <Text style={style.textUpload}>Загрузить фото</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,

    marginHorizontal: 16,
  },
  camera: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 32,

    height: "80%",

    borderRadius: 8,
    marginBottom: 8,
  },

  battonContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",

    borderRadius: 50,
  },

  textUpload: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});
