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
import * as Location from "expo-location";

//иконка
import { EvilIcons } from "@expo/vector-icons";
//кнопка
import { ButtonSubmit } from "../../../../components/ButtonSubmit";

const initDataPicture = {
  name: "картинка",
  place: "страна, город",
  uri: null,
};

export const BeforeTakePicture = ({ route, navigation }) => {
  const [data, setData] = useState(initDataPicture);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (route.params) {
      setData((prevState) => ({ ...prevState, uri: route.params.uri }));
    }
  }, [route.params]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      setHasPermissionLocation(true);
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSend = () => {
    navigation.goBack();
    navigation.navigate("Posts", { ...data, location });
  };

  return (
    <ScrollView style={style.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <View style={style.containerPicture}>
          {data.uri && (
            <Image style={style.picture} source={{ uri: data.uri }} />
          )}
        </View>
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
          <EvilIcons
            name="location"
            size={24}
            color="#BDBDBD"
            style={style.iconLocation}
          />
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
  },
  containerPicture: {
    marginTop: 32,

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

  textUpload: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",

    marginBottom: 32,
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
