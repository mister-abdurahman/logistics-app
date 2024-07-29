import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingOverlay({ message }: { message: string }) {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.message}>oooooooooooooooooo</Text>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: "#fff",
  },
});
