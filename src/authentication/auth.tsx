import React, { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../Http/AxiosInstance";

const AuthContext = createContext<{
  user: string | null;
  token: string | null;
  logout: () => void;
  login: (user: string) => void;
  isLoggingOut: boolean;
  getRole: () => string;
  isAuthenticated: () => boolean;
  isChangePasswordRequired: () => boolean;
} | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const login = (user: string) => {
    setUser(user);
  };

  const logout = async () => {
    if (user) {
      setIsLoggingOut((s) => true);
      try {
        await AxiosInstance().post("logout");
        localStorage.clear();
        setUser((s) => null);
        setToken((s) => null);
      } catch (error) {}
      setIsLoggingOut((s) => false);
    }
  };
  const getRole = () => {
    return localStorage.getItem("role") ?? "";
  };
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      return false;
    }
    return true;
  };
  const isChangePasswordRequired = () => {
    const isChangePassRequired = localStorage.getItem(
      "isChangePasswordRequired"
    );
    if (isChangePassRequired == null) {
      return false;
    }
    return Boolean(parseInt(isChangePassRequired));
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          logout,
          getRole,
          isChangePasswordRequired,
          isAuthenticated,
          isLoggingOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
