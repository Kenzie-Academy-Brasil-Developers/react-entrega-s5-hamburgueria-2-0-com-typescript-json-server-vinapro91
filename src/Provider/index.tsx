import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import React from "react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./authToken";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </AuthProvider>
);
