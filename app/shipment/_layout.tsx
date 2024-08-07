import { MillianColors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

function ScheduleLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: MillianColors.primary700 },
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          title: "Create Shipment",
        }}
      />
    </Stack>
  );
}
const styles = StyleSheet.create({});

export default ScheduleLayout;
