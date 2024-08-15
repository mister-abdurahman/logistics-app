import { MillianColors } from "@/constants/Colors";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import IconButton from "../UI/IconButton";

function ImagePicker({
  pickedImage,
  setPickedImage,
}: {
  pickedImage: null | string;
  setPickedImage: Dispatch<SetStateAction<string | null>>;
}) {
  const [status, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (status?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted; //boolean
    }
    if (status?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permission to use this app"
      );
      return false;
    }
    return true;
  }
  async function handleImagePicker() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets && image?.assets[0].uri);
  }
  return (
    <View>
      <Text>Content goes here</Text>
      <View style={styles.imageBox}>
        {pickedImage ? (
          <Image
            source={{ uri: pickedImage ? pickedImage : "" }}
            style={styles.image}
          />
        ) : (
          <Text>No image selected yet.</Text>
        )}
      </View>
      <OutlineButton handlePress={handleImagePicker} iconName="camera">
        Upload Image
      </OutlineButton>
      {/* <Button title="Upload" onPress={handleImagePicker} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    backgroundColor: MillianColors.primary200,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export default ImagePicker;
