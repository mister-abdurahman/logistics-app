import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProp {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

const initialState = {
  token: "",
  isAuthenticated: false,
  authenticate: () => null,
  logout: () => null,
};

export const AuthContext = createContext<AuthProp>(initialState);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(function () {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) setAuthToken(storedToken);
    }
    fetchToken();
  }, []);

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        isAuthenticated: !!authToken,
        logout,
        token: authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
