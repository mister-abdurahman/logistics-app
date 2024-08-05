import { Colors, MillianColors } from "@/constants/Colors";
import { AuthContext } from "@/store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function _layout() {
  const { isAuthenticated, logout, tokenExpTime } = useContext(AuthContext);
  // if (!isAuthenticated) return <Redirect href="/login" />;

  useEffect(function () {
    const timer = setTimeout(logout, tokenExpTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerTintColor: "#fff",
        tabBarActiveTintColor: MillianColors.primary700,
        tabBarInactiveTintColor: MillianColors.primary200,
        tabBarInactiveBackgroundColor: "#eee",
        tabBarActiveBackgroundColor: MillianColors.primary400,
        headerStyle: { backgroundColor: MillianColors.primary700 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="home" />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerTitle: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="cash-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="shipment"
        options={{
          title: "Shipment",
          headerTitle: "Shipment",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="bus" />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerTitle: "Wallet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="wallet" />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({});

export default _layout;
