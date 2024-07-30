import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProp {
  token: string | null;
  tokenExpTime: number | null;
  isAuthenticated: boolean;
  authenticate: ({
    token,
    expTime,
  }: {
    token: string;
    expTime: number;
  }) => void;
  logout: () => void;
}

const initialState = {
  token: "",
  tokenExpTime: null,
  isAuthenticated: false,
  authenticate: () => null,
  logout: () => null,
};

export const AuthContext = createContext<AuthProp>(initialState);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tokenExpTime, setTokenExpTime] = useState<number | null>(null);

  useEffect(function () {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) setAuthToken(storedToken);
    }
    fetchToken();
  }, []);

  function authenticate({
    token,
    expTime,
  }: {
    token: string;
    expTime: number;
  }) {
    setAuthToken(token);
    setTokenExpTime(expTime);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("tokenExpiryTime", `${expTime}`);
  }
  function logout() {
    setAuthToken(null);
    setTokenExpTime(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("tokenExpiryTime");
  }

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        isAuthenticated: !!authToken,
        logout,
        token: authToken,
        tokenExpTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
