import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Shield, ArrowLeft, RotateCcw, CheckCircle } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import AdminFooter from "@/components/AdminFooter";

export default function VerifyEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Get email from query parameter if provided
    if (router.query.email) {
      setEmail(router.query.email as string);
    }
  }, [router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token
        localStorage.setItem("token", data.token);
        setSuccess(true);
        setMessage("Email verified successfully! You can now sign in.");

        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(data.error || "OTP verification failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setResendLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtp("");
        setMessage("New verification code sent to your email!");
        setTimeout(() => setMessage(""), 5000);
      } else {
        setError(data.error || "Failed to resend verification code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AdminHeader />

        <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Email Verified Successfully! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Your email has been verified. You will be redirected to the home
                page shortly.
              </p>
              <button
                onClick={() => router.push("/")}
                className="btn-primary w-full mb-4"
              >
                Go to Home Page
              </button>
              <Link
                href="/signin"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Or sign in to your account
              </Link>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-primary-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Verify Your Email Address
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and the verification code sent to your
              inbox
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                  <span className="block sm:inline">{message}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 text-center"
                >
                  Verification Code
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    value={otp}
                    onChange={handleOtpChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading || !email || otp.length !== 6}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Don't have a verification code?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendLoading || !email}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50"
                  >
                    {resendLoading ? (
                      <>
                        <RotateCcw className="inline h-4 w-4 mr-1 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Code"
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Link
                    href="/signin"
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
