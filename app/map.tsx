import IconButton from "@/components/UI/IconButton";
import { router, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

function map() {
  const [selectedLocation, setSelectedLocation] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const [tester, setTester] = useState(false);

  const navigation = useNavigation();

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  }

  //   const saveSelectedHandler = useCallback(
  //     function () {
  //       if (!selectedLocation) {
  //         Alert.alert("Not so fast", "No Location selected yet!");
  //         return;
  //       }

  //       router.navigate({
  //         pathname: "/shipment/create",
  //         params: {
  //           latitude: selectedLocation.lat,
  //           longitude: selectedLocation.lng,
  //         },
  //       });
  //     },
  //     [selectedLocation, setSelectedLocation]
  //   );
  console.log("outside:", selectedLocation);

  function saveSelectedHandler() {
    console.log("inside save fn:", selectedLocation);
    if (selectedLocation) {
      alert("true");
    } else {
      alert("false");
    }
    // if (!selectedLocation) {
    //   Alert.alert("Not so fast", "No Location selected yet!");
    //   return;
    // }

    // router.navigate({
    //   pathname: "/shipment/create",
    //   params: {
    //     latitude: selectedLocation.lat,
    //     longitude: selectedLocation.lng,
    //   },
    // });
  }

  useLayoutEffect(function () {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          size={24}
          color="#fff"
          icon={"save"}
          // onPress={() => setTester((prev) => !prev)}
          onPress={saveSelectedHandler}
        />
      ),
    });
  }, []);

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
