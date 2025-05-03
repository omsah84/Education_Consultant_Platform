"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from "@/components/HomeHeader";
import { useAuth } from "@/lib/AuthContext";
import Footer from "@/components/HomeFooter";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Login Result:", result);

      if (res.ok) {
        const { user, accessToken, refreshToken } = result.data;
        login(user, accessToken, refreshToken); // store in context + localStorage
        router.push("/dashboard");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-auto flex items-center justify-center bg-black px-4 py-13">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-[#1a1a1a] text-white p-8 rounded-xl shadow-xl space-y-6 border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error display */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Log In
          </button>

          <p className="text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
