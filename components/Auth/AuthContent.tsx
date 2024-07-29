import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import FlatButton from "../UI/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

interface Props {
  isLogin?: boolean;
  onAuthenticate?: (x: { email: string; password: string }) => void;
}

function AuthContent({ isLogin, onAuthenticate }: Props) {
  return (
    <View style={styles.authContent}>
      <AuthForm isLogin={isLogin} />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.dark.background,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
