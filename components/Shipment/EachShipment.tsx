import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import IconButton from "../UI/IconButton";
import { MillianColors } from "@/constants/Colors";

interface Props {
  title: string;
  address: string;
  url: string;
}
function EachShipment({ title, address, url }: Props) {
  return (
    <View style={styles.box}>
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        style={styles.image}
      />
      <View style={styles.downBox}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={styles.right}>
          <IconButton
            icon={"link"}
            color="black"
            size={24}
            onPress={() => alert("hello")}
          />
          <IconButton
            icon={"open"}
            color="black"
            size={24}
            onPress={() => alert("hello")}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    marginVertical: 12,
    borderColor: MillianColors.primary700,
    borderWidth: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: 64,
    objectFit: "cover",
  },
  downBox: {
    backgroundColor: "#fff",
    borderBottomEndRadius: 8,
    elevation: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
  left: {
    rowGap: 4,
  },
  title: {
    fontWeight: "bold",
  },
  address: {
    fontWeight: "100",
  },
  right: {
    flexDirection: "row",
    columnGap: 4,
  },
  urlBtn: {
    borderRadius: 8,
  },
  editBtn: {
    borderRadius: 8,
  },
});

export default EachShipment;
