"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Mail, Shield, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AdminHeader from "@/components/AdminHeader";
import AdminFooter from "@/components/AdminFooter";

export default function AdminLogin() {
  const router = useRouter();
  const { login, sendOtp } = useAuth();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("ultimatetours1@gmail.com");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await sendOtp(email);
      if (success) {
        setOtpSent(true);
        setStep("otp");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(email, otp);
      if (success) {
        router.push("/admin");
      } else {
        setError("Invalid or expired OTP");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetToEmail = () => {
    setStep("email");
    setOtp("");
    setError("");
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Admin Panel Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Secure login for Ultimate Tours administrators
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {step === "email" && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Step 1: Request Admin OTP
                  </h3>

                  {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Admin Email Address
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
                        value={email}
                        readOnly
                        disabled
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
                        placeholder="ultimatetours1@gmail.com"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      OTP will be sent to the Ultimate Tours admin email address
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Sending OTP...
                      </div>
                    ) : (
                      "Send OTP to Admin Email"
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Step 2: Enter OTP
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We've sent a 6-digit code to <strong>{email}</strong>
                  </p>

                  {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter 6-digit OTP
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyRound className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center text-lg tracking-widest"
                        placeholder="000000"
                        autoComplete="one-time-code"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Verifying...
                      </div>
                    ) : (
                      "Access Admin Panel"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetToEmail}
                    className="w-full text-center text-sm text-primary-600 hover:text-primary-500"
                  >
                    ← Back to email step
                  </button>
                </div>
              </form>
            )}

            {/* Help text */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Admin Access Information:
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Only authorized admin email addresses can access</li>
                <li>• OTP expires in 5 minutes</li>
                <li>• Check your email or server console for the OTP</li>
                <li>• Session lasts 24 hours</li>
              </ul>
            </div>

            {/* Alternative login note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact system administrator
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
