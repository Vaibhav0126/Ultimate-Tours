"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
  sendOtp: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (e.g., from localStorage)
    const token = localStorage.getItem("admin_token");
    const expiry = localStorage.getItem("admin_token_expiry");

    if (token && expiry) {
      const now = new Date().getTime();
      if (now < parseInt(expiry)) {
        setIsAuthenticated(true);
      } else {
        // Token expired, remove it
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_token_expiry");
      }
    }
    setIsLoading(false);
  }, []);

  const sendOtp = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false;
    }
  };

  const login = async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/verify-admin-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token with 24-hour expiry
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_token_expiry", expiry.toString());
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_token_expiry");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        sendOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
