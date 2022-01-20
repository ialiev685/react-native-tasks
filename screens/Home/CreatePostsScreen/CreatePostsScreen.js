import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";

//иконка
import MapIcon from "../../../components/MapIcon";
import { FontAwesome } from "@expo/vector-icons";
import TrashIcon from "../../../components/TrashIcon";

//кнопка
import { ButtonSubmit } from "../../../components/ButtonSubmit";

//инициализации камеры при повторном возврате к ней
import { useIsFocused } from "@react-navigation/native";
//камера
import { Camera } from "expo-camera";
//место хранения
import * as MediaLibrary from "expo-media-library";

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
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showKeyboard, setShowKeyboard] = useState(false);

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      setHasPermissionLocation(true);
    })();
  }, []);

  useEffect(() => {
    const hanldeShowKeyboard = () => {
      setShowKeyboard(true);
    };

    const handleHideKeyBoard = () => {
      setShowKeyboard(false);
    };
    Keyboard.addListener("keyboardDidShow", hanldeShowKeyboard);
    Keyboard.addListener("keyboardDidHide", handleHideKeyBoard);
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", hanldeShowKeyboard);
      Keyboard.removeAllListeners("keyboardDidHide", handleHideKeyBoard);
    };
  }, []);

  const takePhoto = async () => {
    try {
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
      const { uri } = await camera.takePictureAsync();

      setData((prevState) => ({ ...prevState, uri }));

      if (hasPermissionLibrary) {
        await MediaLibrary.createAssetAsync(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    if (!data.uri) return;

    if (hasPermissionLocation) {
      const location = await Location.getCurrentPositionAsync({});

      navigation.navigate("DefaultPosts", { ...data, location });
      setData(initDataPicture);
      return;
    }

    navigation.navigate("DefaultPosts", { ...data });
    setData(initDataPicture);
  };

  const handleDelete = async () => {
    setData((prevState) => ({ ...prevState, uri: null }));
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.container}
      >
        {isFocused && (
          <View
            style={{ ...style.wrapperPhoto, height: showKeyboard ? 0 : 240 }}
          >
            {data.uri === null ? (
              <Camera
                style={style.camera}
                type={Camera.Constants.Type.back}
                ref={(ref) => setCamera(ref)}
                ratio={"4:3"}
              >
                <TouchableOpacity onPress={takePhoto}>
                  <View style={style.battonContainer}>
                    <FontAwesome name="camera" size={20} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
              </Camera>
            ) : (
              // <View style={style.containerPicture}>
              <Image style={style.picture} source={{ uri: data.uri }} />
              // </View>
            )}
          </View>
        )}
        <Text style={style.textUpload}>
          {data.uri !== null ? "Редактировать фото:" : "Загрузите фото"}
        </Text>
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
        <ButtonSubmit
          text={"Опубликовать"}
          onClick={handleSend}
          color={data.uri === null ? "#E8E8E8" : "#FF6C00"}
        />
        <TouchableOpacity style={style.buttonDelete} onPress={handleDelete}>
          <TrashIcon />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginHorizontal: 16,

    borderRadius: 8,

    paddingTop: 32,
  },

  wrapperPhoto: {
    height: 240,

    marginBottom: 8,

    borderRadius: 8,
  },

  containerPicture: {
    height: 240,

    // marginBottom: 8,
  },

  picture: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },

  camera: {
    alignItems: "center",
    justifyContent: "center",

    height: "100%",

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

  buttonDelete: {
    position: "absolute",
    bottom: 22,
    left: "50%",
    transform: [{ translateX: -35 }],

    width: 70,
    height: 40,

    backgroundColor: "#E8E8E8",
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },
});
