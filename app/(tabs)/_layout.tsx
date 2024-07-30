import { Colors } from "@/constants/Colors";
import { AuthContext } from "@/store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function _layout() {
  const { isAuthenticated, logout, tokenExpTime } = useContext(AuthContext);
  if (!isAuthenticated) return <Redirect href="/login" />;

  useEffect(function () {
    const timer = setTimeout(logout, tokenExpTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveBackgroundColor: Colors.dark.text,
        tabBarActiveBackgroundColor: "#000",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="home" />
          ),
          headerTintColor: "gold",
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="cash-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="shipment"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="bus" />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
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
