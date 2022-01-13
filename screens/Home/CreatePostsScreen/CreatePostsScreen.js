import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";

//иконка
import MapIcon from "../../../components/MapIcon";
//кнопка
import { ButtonSubmit } from "../../../components/ButtonSubmit";

//инициализации камеры при повторном возврате к ней
import { useIsFocused } from "@react-navigation/native";
//камера
import { Camera } from "expo-camera";
//место хранения
import * as MediaLibrary from "expo-media-library";
//иконка
import { FontAwesome } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AfterTakePictureScreen } from "../nestedScreens";
import { BeforeTakePictureScreen } from "../nestedScreens";

const NestedStack = createNativeStackNavigator();

const initDataPicture = {
  name: "картинка",
  place: "страна, город",
  uri: null,
};

export const CreatePostsScreen = ({ navigation }) => {
  const [data, setData] = useState(initDataPicture);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(false);
  const [hasPermissionCamera, setHasPermissionCamera] = useState(false);
  const [hasPermissionLibrary, setHasPermissionLibrary] = useState(false);
  const [camera, setCamera] = useState(null);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (route.params) {
  //     setData((prevState) => ({ ...prevState, uri: route.params.uri }));
  //   }
  // }, [route.params]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: statusSave } =
        await MediaLibrary.requestPermissionsAsync();

      setHasPermissionLibrary(statusSave === "granted");
      setHasPermissionCamera(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      setHasPermissionLocation(true);
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { uri } = await camera.takePictureAsync();

      setData((prevState) => ({ ...prevState, uri }));
      if (hasPermissionLibrary) {
        await MediaLibrary.createAssetAsync(uri);
      }

      // navigation.navigate("BeforePicture", { uri });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    if (hasPermissionLocation) {
      const location = await Location.getCurrentPositionAsync({});
      navigation.goBack();
      navigation.navigate("DefaultPosts", { ...data, location });
      return;
    }
    navigation.goBack();
    navigation.navigate("DefaultPosts", { ...data });
  };

  if (!hasPermissionCamera) {
    return (
      <View
        style={{
          ...style.container,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <ScrollView style={style.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        {isFocused && (
          <Camera
            style={style.camera}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCamera(ref)}
            ratio={"4:3"}
          >
            {data.uri && (
              <View style={style.containerPicture}>
                <Image style={style.picture} source={{ uri: data.uri }} />
              </View>
            )}
            {!data.uri && (
              <TouchableOpacity onPress={takePhoto}>
                <View style={style.battonContainer}>
                  <FontAwesome name="camera" size={20} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            )}
          </Camera>
        )}

        <Text style={style.textUpload}>Редактировать фото</Text>
        <TextInput
          placeholder="Название..."
          style={style.input}
          value={data.name}
          onChangeText={(value) =>
            setData((prevState) => ({ ...prevState, name: value }))
          }
        />
        <View style={[style.input, style.inputLocation]}>
          <MapIcon style={style.iconLocation} />

          <TextInput
            placeholder="Местность..."
            value={data.place}
            onChangeText={(value) =>
              setData((prevState) => ({ ...prevState, place: value }))
            }
          />
        </View>
        <ButtonSubmit text={"Опубликовать"} onClick={handleSend} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,

    marginHorizontal: 16,

    borderRadius: 8,
  },

  containerPicture: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    height: 240,

    borderRadius: 8,

    marginBottom: 8,
  },

  picture: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },

  camera: {
    position: "relative",

    // flex: 1,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 32,

    height: 240,

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

    marginBottom: 32,
  },

  input: {
    paddingBottom: 15,
    marginBottom: 32,

    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  iconLocation: {
    marginRight: 4,
  },

  inputLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
});
