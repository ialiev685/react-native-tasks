import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

//иконка

import MapIcon from "../../../components/MapIcon";
//иконка коментарий
import CommentIcon from "../../../components/CommentIcon";

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // console.log("post", route.params);
    if (route.params) {
      // const { location, name, place, uri } = route.params;
      setPosts((prevState) => [...prevState, { ...route.params }]);
    }
  }, [route.params]);

  return (
    <View style={style.container}>
      {posts.length !== 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={style.picture}>
              <View style={style.containerImage}>
                <Image style={style.image} source={{ uri: item.uri }} />
              </View>
              <Text style={style.name}>{item.name}</Text>
              <View style={style.wrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    const { uri } = item;
                    navigation.navigate("Comment", { uri });
                  }}
                >
                  <View style={style.comments}>
                    <CommentIcon />
                    <Text style={style.countComments}>0</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    const { coords } = item.location;
                    navigation.navigate("Map", { coords });
                  }}
                >
                  <View style={style.location}>
                    <MapIcon style={style.iconLocation} />
                    <Text style={style.place}>{item.place}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={style.msgError}>Публикаций нет</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  msgError: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",

    // marginHorizontal: 16,
    marginTop: 32,
    color: "#BDBDBD",
  },

  picture: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  containerImage: {
    height: 240,
    marginBottom: 8,
    overflow: "hidden",
  },
  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },

  name: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    marginBottom: 8,
  },

  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  comments: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  countComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  place: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  iconLocation: {
    marginRight: 4,
  },
});
