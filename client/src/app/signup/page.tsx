"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Header from "@/components/HomeHeader";
import Footer from "@/components/HomeFooter";

type FormData = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  referralCode?: string;
  avatar?: FileList;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError: setFormError,
    clearErrors,
  } = useForm<FormData>();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldInConflict, setFieldInConflict] = useState<
    "email" | "username" | null
  >(null);
  const router = useRouter();

  const password = watch("password", "");

  const validatePassword = (value: string) => {
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(value)) return "Must contain a lowercase letter";
    if (!/[0-9]/.test(value)) return "Must contain a number";
    if (!/[^A-Za-z0-9]/.test(value)) return "Must contain a special character";
    return true;
  };

  const validateAvatar = (files?: FileList) => {
    if (!files?.length) return true;
    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;
    if (!validTypes.includes(file.type))
      return "Only JPG, PNG, or GIF images allowed";
    if (file.size > maxSize) return "Image must be less than 2MB";
    return true;
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    setFieldInConflict(null);
    clearErrors();

    try {
      if (!otpSent) {
        // Send OTP
        const res = await toast.promise(
          fetch("http://localhost:8000/api/v1/users/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email }),
          }),
          {
            loading: "Sending OTP...",
            success: "OTP sent to email",
            error: "Failed to send OTP",
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "OTP request failed");
        }

        setOtpSent(true);
        return;
      }

      // Validate OTP
      if (!/^\d{6}$/.test(otp)) {
        throw new Error("OTP must be a 6-digit number");
      }

      // Validate avatar
      const avatarError = validateAvatar(data.avatar);
      if (avatarError !== true) {
        setFormError("avatar", { type: "manual", message: avatarError });
        throw new Error(avatarError);
      }

      // Prepare form data
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "avatar" && value && value[0]) {
          formData.append("avatar", value[0]);
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      formData.append("otp", otp);

      const res = await toast.promise(
        fetch("http://localhost:8000/api/v1/users/register", {
          method: "POST",
          body: formData,
        }),
        {
          loading: "Registering account...",
          success: "Account created successfully",
          error: "Registration failed",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          const conflict = result.conflictField;
          setFieldInConflict(conflict || null);
        }
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      const message = err.message || "An error occurred. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-[#1a1a1a] text-white p-8 rounded-xl shadow-lg space-y-6 border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-center">
            Create Your Account
          </h2>

          {/* Full Name */}
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            register={register}
            errors={errors}
            rules={{ required: "Full name is required" }}
          />

          {/* Username */}
          <InputField
            label="Username"
            name="username"
            placeholder="john_doe"
            register={register}
            errors={errors}
            conflict={fieldInConflict === "username"}
            rules={{
              required: "Username is required",
              minLength: { value: 4, message: "Minimum 4 characters" },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Only letters, numbers, underscores allowed",
              },
            }}
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            errors={errors}
            conflict={fieldInConflict === "email"}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            errors={errors}
            rules={{
              required: "Password is required",
              validate: validatePassword,
            }}
          />
          {password && !errors.password && (
            <p className="text-green-400 text-xs">Password strength: Good</p>
          )}

          {/* Role */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="">Select Role</option>
              <option value="tenant">Tenant</option>
              <option value="host">Host</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Referral Code */}
          <InputField
            label="Referral Code (Optional)"
            name="referralCode"
            placeholder="Enter referral code"
            register={register}
            errors={errors}
            rules={{
              validate: (value) =>
                !value ||
                /^[A-Z0-9]{6,12}$/i.test(value) ||
                "Invalid referral code",
            }}
          />

          {/* Avatar */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Avatar (Optional)
            </label>
            <input
              {...register("avatar", { validate: validateAvatar })}
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>

          {/* OTP Input */}
          {otpSent && (
            <div>
              <label className="block text-sm mb-1 text-gray-300">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Didn’t receive OTP?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 p-3 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading
              ? otpSent
                ? "Verifying..."
                : "Sending OTP..."
              : otpSent
              ? "Verify & Register"
              : "Send OTP"}
          </button>

          {/* Link to Login */}
          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

// 👇 Reusable input field component
function InputField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  rules,
  conflict = false,
}: any) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-300">{label}</label>
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-[#2a2a2a] border ${
          conflict ? "border-red-500" : "border-gray-600"
        } rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
