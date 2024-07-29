import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { Controller } from "react-hook-form";

// {
//     required: "Username is required",
//     minLength: 4,
//     validate: (value) =>
//       value.length > 5 || "Length must be more than 5 char.",
//   }

interface Props {
  label: string;
  keyboardType?: any;
  secure?: boolean;
  control: any;
  error?: string;
  rules?: any;
  name: string;
}
function Input({
  label,
  keyboardType,
  secure,
  control,
  error,
  rules,
  name,
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, error ? styles.labelInvalid : null]}>
        {label}
      </Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error ? styles.labelInvalid : null]}
            autoCapitalize="none"
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: `red`,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.dark.text,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "red",
  },
});
