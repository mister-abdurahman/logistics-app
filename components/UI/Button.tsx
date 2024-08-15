import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onPress: () => void;
  containerStyle?: object;
  btnTextStyle?: object;
}
function Button({ children, onPress, containerStyle, btnTextStyle }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        containerStyle,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText, btnTextStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "gold",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
