"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Save,
  X,
  MapPin,
  DollarSign,
  Heart,
} from "lucide-react";
import { useUserAuth } from "@/contexts/UserAuthContext";

export default function Profile() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, updateProfile, logout } =
    useUserAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    preferences: {
      travelType: "",
      budget: "",
      destinations: [] as string[],
    },
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signin");
      return;
    }

    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        preferences: {
          travelType: user.preferences?.travelType || "",
          budget: user.preferences?.budget || "",
          destinations: user.preferences?.destinations || [],
        },
      });
    }
  }, [user, isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const success = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        preferences: formData.preferences,
      });

      if (success) {
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("preferences.")) {
      const prefKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addDestination = () => {
    const newDest = prompt("Enter a destination:");
    if (newDest && newDest.trim()) {
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          destinations: [...prev.preferences.destinations, newDest.trim()],
        },
      }));
    }
  };

  const removeDestination = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        destinations: prev.preferences.destinations.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600">
                  Manage your account settings and preferences
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href="/wishlist"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  My Wishlist ({user.wishlist?.length || 0})
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Profile Information
                  </h2>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditing(false)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <p className="text-gray-900 py-2">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">
                        {user.phone || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date of Birth
                    </label>
                    {editing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">
                        {user.dateOfBirth
                          ? new Date(user.dateOfBirth).toLocaleDateString()
                          : "Not provided"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Travel Preferences */}
                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-4">
                    Travel Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Travel Type
                      </label>
                      {editing ? (
                        <select
                          name="preferences.travelType"
                          value={formData.preferences.travelType}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="">Select travel type</option>
                          <option value="adventure">Adventure</option>
                          <option value="leisure">Leisure</option>
                          <option value="cultural">Cultural</option>
                          <option value="business">Business</option>
                          <option value="family">Family</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 py-2">
                          {user.preferences?.travelType || "Not specified"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Budget Range
                      </label>
                      {editing ? (
                        <select
                          name="preferences.budget"
                          value={formData.preferences.budget}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="">Select budget range</option>
                          <option value="budget">Budget ($0 - $500)</option>
                          <option value="mid-range">
                            Mid-range ($500 - $1500)
                          </option>
                          <option value="luxury">Luxury ($1500+)</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 py-2">
                          {user.preferences?.budget || "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Preferred Destinations
                    </label>
                    {editing ? (
                      <div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.preferences.destinations.map(
                            (dest, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                              >
                                {dest}
                                <button
                                  type="button"
                                  onClick={() => removeDestination(index)}
                                  className="ml-2 text-primary-600 hover:text-primary-800"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            )
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={addDestination}
                          className="text-sm text-primary-600 hover:text-primary-800"
                        >
                          + Add destination
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.preferences?.destinations?.length ? (
                          user.preferences.destinations.map((dest, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                            >
                              {dest}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-900 py-2">
                            No destinations specified
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {editing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.isEmailVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.isEmailVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Wishlist Items</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.wishlist?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/packages"
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-primary-600 bg-white border border-primary-200 rounded-md hover:bg-primary-50"
                >
                  Browse Packages
                </Link>
                <Link
                  href="/wishlist"
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  View Wishlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
