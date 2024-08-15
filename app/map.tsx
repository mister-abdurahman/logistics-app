import IconButton from "@/components/UI/IconButton";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

function map() {
  const [selectedLocation, setSelectedLocation] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const navigation = useNavigation();

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  }

  const saveSelectedHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("Not so fast", "No Location selected yet!");
      return;
    }

    router.navigate({
      pathname: "/shipment/create",
      params: {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      },
    });
  }, [navigation, selectedLocation]);

  useEffect(
    function () {
      navigation.setOptions({
        headerRight: ({ tintColor }: { tintColor: string }) => (
          <IconButton
            size={24}
            color={tintColor}
            icon={"save"}
            onPress={saveSelectedHandler}
          />
        ),
      });
    },
    [navigation, saveSelectedHandler]
  );

  return (
    <View style={styles.container}>
      <MapView
        // cameraZoomRange={{ minCenterCoordinateDistance: 500 }}
        style={styles.map}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation?.lat,
              longitude: selectedLocation?.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default map;
