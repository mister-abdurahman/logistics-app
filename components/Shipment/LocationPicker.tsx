import { View, Text, StyleSheet, Alert, Image } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { MillianColors } from "@/constants/Colors";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { getLocationAddress, getMapPreview } from "@/utils/location";
import { router, useLocalSearchParams } from "expo-router";

// api_key: AIzaSyBOhfL3k4Go30mA1hvz4BdfthJASS6q4XU

function LocationPicker({
  location,
  setLocation,
}: {
  location: { lat: number; lng: number; address: string } | null;
  setLocation: Dispatch<
    SetStateAction<null | {
      lat: number;
      lng: number;
      address: string;
    }>
  >;
}) {
  const { longitude: mapLon, latitude: mapLat } = useLocalSearchParams();

  useEffect(
    function () {
      async function setLocationState() {
        if (mapLon && mapLat) {
          const address = await getLocationAddress({
            lat: +mapLat,
            lon: +mapLon,
          });
          setLocation({
            lat: +mapLat,
            lng: +mapLon,
            address: address || "",
          });
        }
      }
      setLocationState();
    },
    [mapLon, mapLat]
  );

  async function getLocation() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Permission to access location was denied");
    const selected_location = await getCurrentPositionAsync();
    const address = await getLocationAddress({
      lat: selected_location.coords.latitude,
      lon: selected_location.coords.longitude,
    });
    setLocation({
      lat: selected_location.coords.latitude,
      lng: selected_location.coords.longitude,
      address: address || "",
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
                {
                  latitude: location.lat,
                  longitude: location.lng,
                } || {
                  latitude: 0,
                  longitude: 0,
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
