"use client";

import { useState, useEffect } from "react";
import { X, Send, User, Mail, Phone, Calendar } from "lucide-react";
import { useUserAuth } from "@/contexts/UserAuthContext";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle?: string;
  packageId?: string;
  travelers: number;
  dateFrom: string;
  dateTo?: string;
  totalPrice: string;
  onSuccess?: () => void;
  packages?: Array<{
    id: string;
    title: string;
    price: string;
  }>;
}

export default function InquiryModal({
  isOpen,
  onClose,
  packageTitle,
  packageId,
  travelers,
  dateFrom,
  dateTo,
  totalPrice,
  onSuccess,
  packages,
}: InquiryModalProps) {
  const { user } = useUserAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-fill form data when user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",
        email: user.email || "",
        phone:
          user.phone && user.phone.trim() !== "" && user.phone !== user.email
            ? user.phone
            : "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          packageTitle,
          packageId,
          travelers,
          dateFrom,
          dateTo,
          totalPrice,
          inquiryType: packages ? "wishlist" : "package",
          packages,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          // Reset form but preserve user data if logged in
          if (user) {
            setFormData({
              name: user.name || "",
              email: user.email || "",
              phone:
                user.phone &&
                user.phone.trim() !== "" &&
                user.phone !== user.email
                  ? user.phone
                  : "",
              message: "",
            });
          } else {
            setFormData({ name: "", email: "", phone: "", message: "" });
          }
          if (onSuccess) onSuccess();
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send inquiry");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Inquiry Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-2">
            Check your email for a confirmation. We'll get back to you within 24
            hours with a customized travel proposal!
          </p>
          <p className="text-sm text-gray-500">
            Thank you for choosing Ultimate Tours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Send Travel Inquiry
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Package Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Inquiry Details</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {packageTitle && (
                <div>
                  <span className="font-medium">Package:</span> {packageTitle}
                </div>
              )}
              <div>
                <span className="font-medium">Travelers:</span> {travelers}{" "}
                {travelers === 1 ? "person" : "people"}
              </div>
              {dateFrom && (
                <div>
                  <span className="font-medium">Travel Dates:</span>{" "}
                  {new Date(dateFrom).toLocaleDateString()}
                  {dateTo && ` to ${new Date(dateTo).toLocaleDateString()}`}
                </div>
              )}
              {totalPrice && (
                <div>
                  <span className="font-medium">Estimated Cost:</span>{" "}
                  {totalPrice} (approx)
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Auto-fill Notification */}
            {user && !success && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Great! We've pre-filled your details. You can update them if
                  needed.
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any specific requirements or questions..."
              />
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Inquiry
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
