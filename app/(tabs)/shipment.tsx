import EachShipment from "@/components/Shipment/EachShipment";
import IconButton from "@/components/UI/IconButton";
import { shipments } from "@/data/dummy-data";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

function shipment() {
  const navigation = useNavigation();
  useLayoutEffect(function () {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"add"}
          color={tintColor}
          size={24}
          onPress={() => router.navigate("shipment/create")}
        />
      ),
    });
  }, []);
  return (
    <View>
      <View style={styles.listContainer}>
        <FlatList
          data={shipments}
          renderItem={(data) => (
            <EachShipment
              title={data.item.itemName}
              address={data.item.address}
              url={data.item.imageUri}
            />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 24,
  },
});

export default shipment;
