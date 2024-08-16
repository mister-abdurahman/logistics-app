import ImagePicker from "@/components/Shipment/ImagePicker";
import LocationPicker from "@/components/Shipment/LocationPicker";
import Button from "@/components/UI/Button";
import FlatButton from "@/components/UI/FlatButton";
import { Colors, MillianColors } from "@/constants/Colors";
import { Shipment } from "@/data/model";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";

function create() {
  const [location, setLocation] = useState<null | {
    lat: number;
    lng: number;
    address: string;
  }>(null);
  const [pickedImage, setPickedImage] = useState<null | string>(null);
  const [title, setTitle] = useState<string>("");

  function createShipment() {
    if (!pickedImage || !location || !title) return;
    const newShipment = new Shipment({
      title,
      imageUri: pickedImage,
      location,
    });
    console.log(newShipment);
  }
  return (
    <ScrollView style={styles.form}>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(val) => setTitle(val)}
        />
      </View>
      <ImagePicker pickedImage={pickedImage} setPickedImage={setPickedImage} />
      <LocationPicker location={location} setLocation={setLocation} />
      <Button
        containerStyle={{
          backgroundColor: MillianColors.primary400,
          marginTop: 8,
        }}
        btnTextStyle={{ color: "#000" }}
        onPress={createShipment}
      >
        Create
      </Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  form: {
    padding: 24,
    // flex: 1,
  },
  inputBox: {
    rowGap: 6,
  },
  label: {
    color: MillianColors.primary400,
    fontSize: 16,
  },
  input: {
    backgroundColor: MillianColors.primary400,
  },
});

export default create;
