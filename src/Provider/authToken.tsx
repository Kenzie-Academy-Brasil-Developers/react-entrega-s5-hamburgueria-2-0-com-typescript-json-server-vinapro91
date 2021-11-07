import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../Services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  id: string;
  name: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SingInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: ({ email, password }: SingInCredentials) => Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used witching an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, seteData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@HamburgueriaKenzie:accessToken");
    const user = localStorage.getItem("@HamburgueriaKenzie:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }: SingInCredentials) => {
    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("@HamburgueriaKenzie:accessToken", accessToken);
    localStorage.setItem("@HamburgueriaKenzie:user", user);
    seteData({ accessToken, user });
  }, []);
  return (
    <AuthContext.Provider
      value={{ accessToken: data.accessToken, user: data.user, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
