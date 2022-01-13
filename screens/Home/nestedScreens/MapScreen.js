import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
//карта
import MapView, { Marker } from "react-native-maps";
//

const initCoords = {
  latitude: 0,
  longitude: 0,
};

export const MapScreen = ({ route }) => {
  // console.log("map", route.params);
  const [coords, setCoords] = useState(initCoords);

  useEffect(() => {
    if (route.params) {
      // console.log(route.params);
      const { latitude, longitude } = route.params.coords;

      setCoords({ latitude, longitude });
    }
  }, []);

  return (
    <View style={style.container}>
      <MapView
        style={{ flex: 1 }}
        minZoomLevel={15}
        // maxZoomLevel={20}
        mapType={"standard"}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.002,
        }}
      >
        <View style={style.marker}>
          <Marker
            coordinate={{ ...coords }}
            image={require("../../../icons/m_marker.png")}
          />
        </View>
      </MapView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    width: 5,
    height: 10,
  },
});
