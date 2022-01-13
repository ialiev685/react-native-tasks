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

export const CommentsScreen = ({ route, navigation }) => {
  const [picture, setPicture] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState(null);

  const handleSendMessage = () => {
    const msg = {
      id: uuid.v4(),
      text,
      name: "Ilfat Aliev",
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={style.containerPicture}>
          {picture && <Image style={style.picture} source={{ uri: picture }} />}
        </View>
        <View style={style.chatBox}>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <Text>{item.text}</Text>}
          />
        </View>
        <View style={style.input}>
          <TextInput
            style={style.control}
            value={text}
            placeholder="Комментировать..."
            onChangeText={setText}
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
      </KeyboardAvoidingView>
    </View>
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

  chatBox: {},

  input: {
    position: "relative",
    // flexDirection: "row",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
  },

  control: {
    width: "100%",

    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingRight: 50,

    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 19,
    fontStyle: "normal",
  },
  button: {
    position: "absolute",
    top: 11,
    right: 11,

    justifyContent: "center",
    alignItems: "center",

    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  icon: {},
});
