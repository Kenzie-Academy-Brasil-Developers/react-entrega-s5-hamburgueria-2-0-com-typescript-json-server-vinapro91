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

interface AuthState {
  accessToken: string;
  user: string;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: string;
  accessToken: string;
  signIn: ({ email, password }: SingInCredentials) => Promise<void>;
  signOut: () => void;
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
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@HamburgueriaKenzie:accessToken");
    const user = localStorage.getItem("@HamburgueriaKenzie:user");

    if (accessToken && user) {
      return { accessToken, user: user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SingInCredentials) => {
    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("@HamburgueriaKenzie:accessToken", accessToken);
    localStorage.setItem("@HamburgueriaKenzie:user", user.id);
    setData({ accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@HamburgueriaKenzie:accessToken");
    localStorage.removeItem("@HamburgueriaKenzie:user");
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
