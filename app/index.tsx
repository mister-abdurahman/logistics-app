// app/index.js
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/home" />; //change to login
}