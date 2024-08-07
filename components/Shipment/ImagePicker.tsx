import { launchCameraAsync } from "expo-image-picker";
import { View, Text, StyleSheet, Button } from "react-native";

function ImagePicker() {
  async function handleImagePicker() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  }
  return (
    <View>
      <Text>Content goes here</Text>
      <Button title="Upload" onPress={handleImagePicker} />
    </View>
  );
}
const styles = StyleSheet.create({});

export default ImagePicker;
