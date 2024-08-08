import ImagePicker from "@/components/Shipment/ImagePicker";
import LocationPicker from "@/components/Shipment/LocationPicker";
import { Colors, MillianColors } from "@/constants/Colors";
import { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";

function create() {
  return (
    <ScrollView style={styles.form}>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} />
      </View>
      <ImagePicker />
      <LocationPicker />
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
