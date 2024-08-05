import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

function ScheduleLayout() {
  return (
    <Stack>
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
