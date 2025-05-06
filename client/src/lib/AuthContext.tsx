// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const AuthContext = createContext<any>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     // No localStorage: nothing to preload
//     // If needed, you can call refreshAccessToken or a /me endpoint here
//   }, []);

//   const refreshAccessToken = async () => {
//     try {
//       const res = await axios.post("http://localhost:8000/api/v1/users/refresh-token", {}, {
//         withCredentials: true, // if using secure cookies
//       });
//       const newAccessToken = res.data.accessToken;
//       setAccessToken(newAccessToken);
//       return newAccessToken;
//     } catch (err) {
//       logout();
//     }
//   };

//   const login = (userData: any, token: string) => {
//     setUser(userData);
//     setAccessToken(token);
//     setIsAuthenticated(true);
//   };

//   const logout = async () => {
//     try {
//       await fetch("http://localhost:8000/api/v1/users/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         credentials: "include", // if cookies are used
//       });

//       router.push("/login");
//     } catch (err) {
//       console.error("Logout API error:", err);
//     }

//     setUser(null);
//     setAccessToken(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         accessToken,
//         isAuthenticated,
//         login,
//         logout,
//         refreshAccessToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const AuthContext = createContext<any>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [isLoading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Check localStorage for saved login

//     const checkAuth = async () => {
//       try {
//         const res = await axios.post("http://localhost:8000/api/v1/users/me", {}, {
//           withCredentials: true, // required for sending cookies
//         });

//         setUser(res.data.user);
//         setIsAuthenticated(true);
//       } catch (err) {
//         setUser(null);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     checkAuth();
//     // const storedUser = localStorage.getItem("user");
//     // const storedToken = localStorage.getItem("accessToken");
//     // const storedRefresh = localStorage.getItem("refreshToken");

//     // if (storedUser && storedToken && storedRefresh) {
//     //   setUser(JSON.parse(storedUser));
//     //   setAccessToken(storedToken);
//     // }
//   }, []);

//   // 🔁 Refresh token logic
//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");
//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/users/refresh-token",
//         {
//           refreshToken,
//         }
//       );
//       const newAccessToken = res.data.accessToken;
//       setAccessToken(newAccessToken);
//       localStorage.setItem("accessToken", newAccessToken);
//       return newAccessToken;
//     } catch (err) {
//       logout(); // On failure, force logout
//     }
//   };

//   const login = (userData: any, token: string, refresh: string) => {
//     setUser(userData);
//     setAccessToken(token);
//     setIsAuthenticated(true);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("accessToken", token);
//     localStorage.setItem("refreshToken", refresh);
//   };

//   const logout = async () => {
//     try {
//       const storedAccessToken = localStorage.getItem("accessToken");

//       const res = await fetch("http://localhost:8000/api/v1/users/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${storedAccessToken}`,
//         },
//       });

//       console.log("Raw Logout Response:", res);

//       const data = await res.json();
//       console.log("Parsed Logout Response:", data);
//       router.push("/login");
//     } catch (err) {
//       console.error("Logout API error:", err);
//     }

//     // Clear local state and localStorage
//     // setUser(null);
//     // setAccessToken(null);
//     // setIsAuthenticated(false);
//     // localStorage.removeItem("user");
//     // localStorage.removeItem("accessToken");
//     // localStorage.removeItem("refreshToken");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         setIsAuthenticated,
//         accessToken,
//         login,
//         logout,
//         refreshAccessToken,
//         isLoading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }



"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/users/me",
          {},
          { withCredentials: true }
        );

        
        setUser(res.data.data)
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/refresh-token",
        {},
        { withCredentials: true }
      );
      const newAccessToken = res.data.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (err) {
      logout(); // On failure, force logout
    }
  };

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Removed localStorage
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      router.push("/login");
      setIsAuthenticated(false)
    } catch (err) {
      console.error("Logout API error:", err);
    }

    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    // Removed localStorage clear
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isLoading,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
