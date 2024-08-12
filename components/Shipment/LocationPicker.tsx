import { View, Text, StyleSheet, Alert, Image } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { MillianColors } from "@/constants/Colors";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { getMapPreview } from "@/utils/location";
import { router } from "expo-router";

// api_key: AIzaSyBOhfL3k4Go30mA1hvz4BdfthJASS6q4XU

function LocationPicker() {
  const [location, setLocation] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  }>(null);

  async function getLocation() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Permission to access location was denied");
    const selected_location = await getCurrentPositionAsync();
    setLocation({
      latitude: selected_location.coords.latitude,
      longitude: selected_location.coords.longitude,
      latitudeDelta: -1,
      longitudeDelta: -1,
    });
  }

  function pickOnMap() {
    router.navigate("/map");
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {location ? (
          //   <Image
          //     style={styles.map}
          //     source={{
          //       uri: getMapPreview({
          //         latitude: location.latitude,
          //         longitude: location.longitude,
          //       }),
          //     }}
          //   />
          // ) : (
          <MapView style={styles.map}>
            <Marker
              coordinate={
                location || {
                  latitude: 0,
                  longitude: 0,
                  latitudeDelta: 0.000005,
                  longitudeDelta: 0.000005,
                }
              }
            />
          </MapView>
        ) : (
          <Text>No Location Set Yet!.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlineButton iconName="location" handlePress={getLocation}>
          Locate User
        </OutlineButton>
        <OutlineButton iconName="map" handlePress={pickOnMap}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    backgroundColor: MillianColors.primary200,
    marginVertical: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LocationPicker;
