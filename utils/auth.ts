import axios from "axios";

const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts";

const API_KEY = "AIzaSyBLo0DTq1AopsUlaVktlftJtT6XEZno9fE";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${AUTH_URL}:signUp?key=${API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });
    const token = response.data.idToken;
    return token;
  } catch (error) {
    console.log(error);
  }
}
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${AUTH_URL}:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const token = response.data.idToken;
    return token;
  } catch (error) {
    throw new Error(error?.message || error?.AxiosError);
  }
}
export async function getSecretData({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${AUTH_URL}:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const token = response.data.idToken;
    return token;
  } catch (error) {
    throw new Error(error?.message || error?.AxiosError);
  }
}
