import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("post", route.params);
    if (route.params) {
      // const { location, name, place, uri } = route.params;
      setPosts((prevState) => [...prevState, { ...route.params }]);
    }
  }, [route.params]);

  return (
    <View style={style.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={style.picture}>
            <View style={style.containerImage}>
              <Image style={style.image} source={{ uri: item.uri }} />
            </View>
            <Text>{item.name}</Text>
            <Text>{item.place}</Text>
          </View>
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    marginHorizontal: 16,
    marginTop: 32,
  },

  picture: {
    marginBottom: 32,
  },
  containerImage: {
    // width: "100%",
    height: 240,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
