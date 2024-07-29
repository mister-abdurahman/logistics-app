import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "../UI/Button";
import Input from "./Input";
import { Controller, useForm } from "react-hook-form";
import { createUser, loginUser } from "@/utils/auth";
import LoadingOverlay from "../UI/LoadingOverlay";
import { router } from "expo-router";
import FlatButton from "../UI/FlatButton";
import { AuthContext } from "@/store/auth-context";

interface Props {
  isLogin?: boolean;
}

interface dataProp {
  email: string;
  password: string;
}

function AuthForm({ isLogin }: Props) {
  const { authenticate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { email: "", confirmEmail: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data: dataProp) {
    try {
      setIsLoading(true);
      const token = isLogin
        ? await loginUser({
            email: data.email,
            password: data.password,
          })
        : await createUser({
            email: data.email,
            password: data.password,
          });
      authenticate(token);
      router.replace("home");
    } catch (error) {
      console.log("catch block:", error);
      Alert.alert(
        "Authentication failed!",
        error?.Error ||
          ` ${
            isLogin ? "Could not log you in" : "Could not complete sign up"
          }. Please check your credentials or try again later`
      );
      //   Alert.alert(
      //     "Authentication failed!",
      //     ` ${
      //       isLogin ? "Could not log you in" : "Could not complete sign up"
      //     }. Please check your credentials or try again later`
      //   );
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading)
    return (
      <LoadingOverlay
        message={isLogin ? "Logging In..." : `Creating User...`}
      />
    );
  return (
    <>
      <View style={styles.form}>
        <View>
          <Input
            name="email"
            label="Email Address"
            keyboardType="email-address"
            rules={{
              required: "Email is required",
              minLength: 4,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            control={control}
            error={errors?.email?.message}
          />
          {!isLogin && (
            <Input
              name="confirmEmail"
              label="Confirm Email Address"
              keyboardType="email-address"
              control={control}
              error={errors?.confirmEmail?.message}
              rules={{
                validate: (value: string) =>
                  value === getValues().email || "Must match Email address.",
              }}
            />
          )}
          <Input
            name="password"
            label="Password"
            secure
            control={control}
            error={errors?.password?.message}
            rules={{
              validate: (value: string) =>
                value.length >= 6 || "Password must be at least 6 char.",
            }}
          />
          {!isLogin && (
            <Input
              name="confirmPassword"
              label="Confirm Password"
              secure
              control={control}
              error={errors?.confirmPassword?.message}
              rules={{
                validate: (value: string) =>
                  value === getValues().password || "Must match Password.",
              }}
            />
          )}
          <View style={styles.buttons}>
            <Button onPress={handleSubmit(onSubmit)}>
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <FlatButton
          onPress={() => router.replace(isLogin ? "signup" : "login")}
        >
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  form: {},
});
