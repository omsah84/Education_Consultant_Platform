"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for saved login
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem('refreshToken');

    if (storedUser && storedToken && storedRefresh) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
  }, []);

   // 🔁 Refresh token logic
   const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/refresh-token', {
        refreshToken,
      });
      const newAccessToken = res.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (err) {
      logout(); // On failure, force logout
    }
  };

  const login = (userData: any, token: string,refresh: string) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);
    localStorage.setItem('refreshToken', refresh);
  };

  const logout = async () => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");

      const res = await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });

      console.log("Raw Logout Response:", res);

      const data = await res.json();
      console.log("Parsed Logout Response:", data);
      router.push('/login');
    } catch (err) {
      console.error("Logout API error:", err);
    }

    // Clear local state and localStorage
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout,refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
