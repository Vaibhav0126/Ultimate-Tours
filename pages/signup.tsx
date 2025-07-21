"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  UserPlus,
  Shield,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { useUserAuth } from "@/contexts/UserAuthContext";
import AdminHeader from "@/components/AdminHeader";
import AdminFooter from "@/components/AdminFooter";

type SignupStep = "registration" | "otp-verification" | "success";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

interface OtpData {
  email: string;
  otp: string;
}

export default function SignUp() {
  const router = useRouter();
  const { setUser } = useUserAuth(); // Add this to access auth context
  const [currentStep, setCurrentStep] = useState<SignupStep>("registration");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const [otpData, setOtpData] = useState<OtpData>({
    email: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Validate age (13+)
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        age < 13 ||
        (age === 13 && monthDiff < 0) ||
        (age === 13 && monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        setError("You must be at least 13 years old to register");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpData({ email: data.email, otp: "" });
        setCurrentStep("otp-verification");
        setOtpSent(true);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setError("");

    if (!otpData.otp || otpData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setOtpLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: otpData.email,
          otp: otpData.otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token with correct key names and expiry (7 days)
        const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_token_expiry", expiry.toString());

        // Update the authentication context immediately with the user data from response
        setUser(data.user);

        setCurrentStep("success");
      } else {
        setError(data.error || "OTP verification failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: otpData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setOtpData((prev) => ({ ...prev, otp: "" }));
      } else {
        setError(data.error || "Failed to resend OTP");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setResendLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpData((prev) => ({ ...prev, otp: value }));
  };

  // Success Step
  if (currentStep === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AdminHeader />

        <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Ultimate Tours! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Your account has been created and verified successfully. You are
                now logged in and can explore our amazing tour packages!
              </p>
              <button
                onClick={() => router.push("/")}
                className="btn-primary w-full"
              >
                Start Exploring
              </button>
              <Link
                href="/signin"
                className="block mt-4 text-sm text-gray-600 hover:text-gray-900"
              >
                Or go to sign in page
              </Link>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    );
  }

  // OTP Verification Step
  if (currentStep === "otp-verification") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AdminHeader />

        <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-primary-600" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Verify Your Email
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a 6-digit verification code to
                <br />
                <span className="font-medium text-gray-900">
                  {otpData.email}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleOtpSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 text-center"
                  >
                    Enter Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      required
                      value={otpData.otp}
                      onChange={handleOtpChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Code expires in 10 minutes
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={otpLoading || otpData.otp.length !== 6}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpLoading ? "Verifying..." : "Verify Email"}
                  </button>

                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      Didn't receive the code?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendLoading}
                      className="text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50"
                    >
                      {resendLoading ? (
                        <>
                          <RotateCcw className="inline h-4 w-4 mr-1 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Resend Code"
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("registration")}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    );
  }

  // Registration Step (default)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <UserPlus className="mx-auto h-12 w-12 text-primary-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                href="/signin"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleRegistrationSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    autoComplete="bday"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-primary-600 hover:text-primary-500"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-500"
                >
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
