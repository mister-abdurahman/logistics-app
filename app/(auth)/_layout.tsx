import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Log In",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "SIgn Up",
        }}
      />
    </Stack>
  );
}
const styles = StyleSheet.create({});

export default AuthLayout;
