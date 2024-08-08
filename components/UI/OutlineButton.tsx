import { MillianColors } from "@/constants/Colors";
import { ReactNode } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import IconButton from "./IconButton";

interface Props {
  children: string;
  btnStyle?: object;
  iconName?: string;
  handlePress?: () => void;
}
function OutlineButton({ children, btnStyle, handlePress, iconName }: Props) {
  return (
    <Pressable style={[styles.btnContainer, btnStyle]} onPress={handlePress}>
      <View style={styles.btnContentBox}>
        <IconButton
          icon={iconName}
          size={20}
          color={MillianColors.primary500}
        />
        <Text
          style={{
            color: MillianColors.primary500,
            textTransform: "uppercase",
          }}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    borderColor: MillianColors.primary500,
    borderWidth: 2,
    padding: 7,
  },
  btnContentBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default OutlineButton;
