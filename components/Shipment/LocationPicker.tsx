import { View, Text, StyleSheet, Alert } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { MillianColors } from "@/constants/Colors";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState } from "react";
import MapView from "react-native-maps";

// api_key: AIzaSyBOhfL3k4Go30mA1hvz4BdfthJASS6q4XU

function LocationPicker() {
  const [location, setLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);

  async function getLocation() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Permission to access location was denied");
    const selected_location = await getCurrentPositionAsync();
    setLocation({
      latitude: selected_location.coords.latitude,
      longitude: selected_location.coords.longitude,
    });
  }

  function pickOnMap() {}

  return (
    <View>
      <View style={styles.mapPreview}>
        <MapView style={styles.map} onRegionChange={() => location} />
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
