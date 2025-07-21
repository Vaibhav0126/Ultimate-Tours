"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  isEmailVerified: boolean;
  wishlist: Array<{
    packageId: string;
    addedAt: string;
  }>;
  preferences?: {
    travelType?: string;
    budget?: string;
    destinations?: string[];
  };
  provider?: string;
  profileImage?: string;
}

interface UserAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string,
    dateOfBirth?: string
  ) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void; // Add setUser method
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  addToWishlist: (packageId: string) => Promise<boolean>;
  removeFromWishlist: (packageId: string) => Promise<boolean>;
  isInWishlist: (packageId: string) => boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(
      "🔍 UserAuthContext useEffect triggered - checking custom JWT auth..."
    );
    checkCustomJWTAuth();
  }, []);

  const checkCustomJWTAuth = () => {
    console.log("🔍 Checking custom JWT authentication...");

    // Check if user is already authenticated via custom JWT
    const token = localStorage.getItem("user_token");
    const expiry = localStorage.getItem("user_token_expiry");

    if (token && expiry) {
      const now = new Date().getTime();
      if (now < parseInt(expiry)) {
        // Token is valid, fetch user data
        fetchUserProfile();
      } else {
        // Token expired, remove it
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_token_expiry");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("✅ Custom JWT user data fetched:", userData);

        setUser(userData);
      } else {
        // Invalid token, clear it
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_token_expiry");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    dateOfBirth?: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone, dateOfBirth }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error registering user:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token with 7-day expiry
        const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_token_expiry", expiry.toString());

        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = () => {
    // Clear custom JWT tokens
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_token_expiry");

    // Clear user state
    setUser(null);

    // If this was a NextAuth session, we'll need to sign out from NextAuth too
    // Note: signOut from next-auth/react should be called from the component level
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  const addToWishlist = async (packageId: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ packageId }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return false;
    }
  };

  const removeFromWishlist = async (packageId: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await fetch("/api/user/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ packageId }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return false;
    }
  };

  const isInWishlist = (packageId: string): boolean => {
    return (
      user?.wishlist?.some((item) => item.packageId === packageId) || false
    );
  };

  const isAuthenticated = !!user;

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        setUser, // Expose setUser method
        updateProfile,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
}
