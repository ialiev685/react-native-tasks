import React, { useState, useEffect } from "react";
import uuid from "react-native-uuid";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";

//иконка
import { AntDesign } from "@expo/vector-icons";
//нормализация даты
import { NormalizeDate } from "../../../helpers";

export const CommentsScreen = ({ route, navigation }) => {
  const [picture, setPicture] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState(null);

  const handleSendMessage = () => {
    const date = NormalizeDate();

    console.log(date);

    const msg = {
      id: uuid.v4(),
      text,
      name: "Ilfat Aliev",
      date,
    };

    setMessages((prevState) => [...prevState, msg]);
  };

  useEffect(() => {
    if (route.params) {
      const { uri } = route.params;
      setPicture(uri);
    }
  }, []);

  return (
    <View style={style.container}>
      <View style={style.containerPicture}>
        {picture && <Image style={style.picture} source={{ uri: picture }} />}
      </View>

      <FlatList
        style={{ marginTop: 32 }}
        data={messages}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={style.wrapperComment}>
            <Text style={style.textCommnet}>{item.text}</Text>
            <Text style={style.textTime}>{item.date}</Text>
          </View>
        )}
      />

      <View style={style.input}>
        <TextInput
          style={style.control}
          value={text}
          placeholder="Комментировать..."
          onChangeText={setText}
          multiline={true}
          scrollEnabled={true}
        />
        <TouchableOpacity style={style.button} onPress={handleSendMessage}>
          <AntDesign
            style={style.icon}
            name="arrowup"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,

    marginHorizontal: 16,
    paddingBottom: 80,
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

  input: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,

    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 16,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderRadius: 40,
    borderColor: "#E8E8E8",

    backgroundColor: "#E8E8E8",
  },

  control: {
    width: "100%",

    paddingLeft: 16,
    paddingRight: 26,

    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 16,
    fontStyle: "normal",

    maxHeight: 120,
  },
  button: {
    position: "absolute",
    top: "50%",
    right: 8,
    // transform: [{ translateY: -10 }],

    justifyContent: "center",
    alignItems: "center",

    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },

  wrapperComment: {
    flexDirection: "column",
    textAlign: "right",

    padding: 16,

    backgroundColor: "#E8E8E8",

    borderRadius: 6,
    borderTopLeftRadius: 0,

    marginBottom: 24,
  },

  textCommnet: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,

    marginBottom: 8,
  },

  textTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,

    color: "#BDBDBD",
  },
});
