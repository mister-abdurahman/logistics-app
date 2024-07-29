import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

function home() {
  return (
    <View>
      <Text>Home</Text>
      <Link href={"signup"} style={{ color: "#fff" }} />
    </View>
  );
}
const styles = StyleSheet.create({});

export default home;
