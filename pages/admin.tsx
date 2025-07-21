"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit, Trash2, Search, Filter, X, LogOut } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  location: string;
  category: "local" | "international";
  image: string;
  images: string[];
  features: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  maxGroupSize: number;
  difficulty: string;
  bestTime: string;
}

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  const [packages, setPackages] = useState<Package[]>([]);
  const [activeTab, setActiveTab] = useState<"local" | "international">(
    "local"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Package>>({
    title: "",
    location: "",
    duration: "",
    price: 0,
    originalPrice: 0,
    image: "",
    images: [],
    description: "",
    features: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    maxGroupSize: 10,
    difficulty: "Easy",
    bestTime: "Year Round",
    category: "local",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    if (isAuthenticated) {
      fetchPackages();
    }
  }, [isAuthenticated, isLoading, router]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate counts for each category separately
  const localPackages = packages.filter((pkg) => pkg.category === "local");
  const internationalPackages = packages.filter(
    (pkg) => pkg.category === "international"
  );

  const currentPackages = packages.filter((pkg) => pkg.category === activeTab);
  const filteredPackages = currentPackages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await fetch(`/api/packages/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchPackages();
        }
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const packageData = {
        ...formData,
        category: activeTab,
        itinerary: formData.itinerary || [],
        // Clean array data by removing empty lines
        features: cleanArrayData(formData.features || []),
        inclusions: cleanArrayData(formData.inclusions || []),
        exclusions: cleanArrayData(formData.exclusions || []),
      };

      if (editingPackage) {
        // Update existing package
        const response = await fetch(`/api/packages/${editingPackage.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(packageData),
        });
        if (!response.ok) throw new Error("Failed to update package");
      } else {
        // Add new package
        const response = await fetch("/api/packages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(packageData),
        });
        if (!response.ok) throw new Error("Failed to create package");
      }

      fetchPackages();
      setIsModalOpen(false);
      setEditingPackage(null);
      resetForm();
    } catch (error) {
      console.error("Error saving package:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      duration: "",
      price: 0,
      originalPrice: 0,
      image: "",
      images: [],
      description: "",
      features: [],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      maxGroupSize: 10,
      difficulty: "Easy",
      bestTime: "Year Round",
      category: "local",
    });
  };

  const handleArrayInput = (
    field: "features" | "inclusions" | "exclusions",
    value: string
  ) => {
    // Store the raw text value to preserve line breaks during typing
    setFormData((prev) => ({
      ...prev,
      [field]: value.split("\n"), // Don't filter during typing to preserve line breaks
    }));
  };

  // Function to clean array data before submission (remove empty lines)
  const cleanArrayData = (arr: string[]): string[] => {
    return arr.filter((item) => item.trim());
  };

  // Function to handle image upload
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const addItineraryDay = () => {
    const currentItinerary = formData.itinerary || [];
    const newDay: ItineraryDay = {
      day: currentItinerary.length + 1,
      title: "",
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      itinerary: [...currentItinerary, newDay],
    }));
  };

  // Multiple image handling functions
  const addGalleryImage = () => {
    const currentImages = formData.images || [];
    setFormData((prev) => ({
      ...prev,
      images: [...currentImages, ""],
    }));
  };

  const removeGalleryImage = (index: number) => {
    const currentImages = formData.images || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const updateGalleryImage = (index: number, value: string) => {
    const currentImages = formData.images || [];
    const updatedImages = currentImages.map((img, idx) =>
      idx === index ? value : img
    );
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleGalleryImageUpload = async (file: File, index: number) => {
    try {
      setUploading(true);
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        updateGalleryImage(index, imageUrl);
      }
    } finally {
      setUploading(false);
    }
  };

  // Image validation function
  const isValidImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url) {
        resolve(false);
        return;
      }
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const updateItineraryDay = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const currentItinerary = [...(formData.itinerary || [])];
    currentItinerary[index] = {
      ...currentItinerary[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      itinerary: currentItinerary,
    }));
  };

  const removeItineraryDay = (index: number) => {
    const currentItinerary = [...(formData.itinerary || [])];
    currentItinerary.splice(index, 1);
    // Re-number the days
    const renumberedItinerary = currentItinerary.map((day, idx) => ({
      ...day,
      day: idx + 1,
    }));
    setFormData((prev) => ({
      ...prev,
      itinerary: renumberedItinerary,
    }));
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render the dashboard if not authenticated (redirect is handled in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your tour packages</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setEditingPackage(null);
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="btn-primary flex items-center"
                disabled={loading}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Package
              </button>
              <button
                onClick={handleLogout}
                className="btn-outline flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        {/* Tabs and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex space-x-1">
              {[
                {
                  key: "local" as const,
                  label: "Domestic Packages",
                  count: localPackages.length,
                },
                {
                  key: "international" as const,
                  label: "International Packages",
                  count: internationalPackages.length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading && (
            <div className="p-8 text-center">
              <div className="text-gray-600">Loading packages...</div>
            </div>
          )}

          {!loading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 mr-4 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={pkg.image}
                              alt={pkg.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.style.display = "none";
                                const parentDiv =
                                  img.parentElement as HTMLElement;
                                if (parentDiv) {
                                  const errorDiv =
                                    document.createElement("div");
                                  errorDiv.className =
                                    "absolute inset-0 flex items-center justify-center text-gray-400";
                                  errorDiv.innerHTML = `
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  `;
                                  parentDiv.appendChild(errorDiv);
                                }
                              }}
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {pkg.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {pkg.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </span>
                          {pkg.originalPrice &&
                            pkg.originalPrice > pkg.price && (
                              <span className="text-xs text-gray-500 line-through">
                                ₹{pkg.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          <span className="text-xs text-gray-500">
                            per person
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="text-primary-600 hover:text-primary-800"
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="text-red-600 hover:text-red-800"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No packages found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or add a new package
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingPackage ? "Edit Package" : "Add New Package"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 5 Days / 4 Nights"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹ INR) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 25000"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (₹ INR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 30000"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Group Size *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.maxGroupSize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxGroupSize: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty *
                    </label>
                    <select
                      required
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({ ...formData, difficulty: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Best Time to Visit *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., October to March"
                      value={formData.bestTime}
                      onChange={(e) =>
                        setFormData({ ...formData, bestTime: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Image *
                    </label>

                    {/* Current Image Preview */}
                    {formData.image && (
                      <div className="mb-4">
                        <img
                          src={formData.image}
                          alt="Package preview"
                          className="w-32 h-24 object-cover rounded-lg border"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = "none";
                            const errorDiv =
                              img.nextElementSibling as HTMLElement;
                            if (errorDiv) errorDiv.style.display = "block";
                          }}
                        />
                        <div className="w-32 h-24 bg-gray-100 rounded-lg border flex items-center justify-center text-gray-500 text-sm hidden">
                          <div className="text-center">
                            <X className="h-4 w-4 mx-auto mb-1" />
                            <span>Image not found</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Upload Options */}
                    <div className="space-y-4">
                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Upload from Computer
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {uploading ? (
                                <div className="text-center">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                                  <p className="text-sm text-gray-500">
                                    Uploading...
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <svg
                                    className="w-8 h-8 mb-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, JPEG (MAX. 5MB)
                                  </p>
                                </>
                              )}
                            </div>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const imageUrl = await handleImageUpload(
                                    file
                                  );
                                  if (imageUrl) {
                                    setFormData({
                                      ...formData,
                                      image: imageUrl,
                                    });
                                  }
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {/* URL Input Alternative */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Or enter Image URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          value={formData.image || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, image: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery Images Section */}
                <div className="col-span-full">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Gallery Images (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="btn-outline text-sm py-2 px-4"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Image
                    </button>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {(formData.images || []).map((imageUrl, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800">
                            Gallery Image {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Image Preview */}
                        {imageUrl && (
                          <div className="mb-4">
                            <img
                              src={imageUrl}
                              alt={`Gallery ${index + 1}`}
                              className="w-32 h-24 object-cover rounded-lg border"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.style.display = "none";
                                const errorDiv =
                                  img.nextElementSibling as HTMLElement;
                                if (errorDiv) errorDiv.style.display = "block";
                              }}
                            />
                            <div className="w-32 h-24 bg-gray-100 rounded-lg border flex items-center justify-center text-gray-500 text-sm hidden">
                              Image not found
                            </div>
                          </div>
                        )}

                        <div className="space-y-4">
                          {/* File Upload */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Upload Image
                            </label>
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor={`gallery-upload-${index}`}
                                className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                                  {uploading ? (
                                    <div className="text-center">
                                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto mb-1"></div>
                                      <p className="text-xs text-gray-500">
                                        Uploading...
                                      </p>
                                    </div>
                                  ) : (
                                    <>
                                      <svg
                                        className="w-6 h-6 mb-2 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                      </svg>
                                      <p className="text-xs text-gray-500">
                                        <span className="font-semibold">
                                          Click to upload
                                        </span>
                                      </p>
                                    </>
                                  )}
                                </div>
                                <input
                                  id={`gallery-upload-${index}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  disabled={uploading}
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      await handleGalleryImageUpload(
                                        file,
                                        index
                                      );
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          {/* URL Input */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Or enter Image URL
                            </label>
                            <input
                              type="text"
                              placeholder="https://example.com/image.jpg"
                              value={imageUrl || ""}
                              onChange={(e) =>
                                updateGalleryImage(index, e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {(formData.images || []).length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <p className="text-gray-500">
                        No gallery images added yet.
                      </p>
                      <p className="text-sm text-gray-400">
                        Click "Add Image" to start building your gallery.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Itinerary Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Itinerary
                    </label>
                    <button
                      type="button"
                      onClick={addItineraryDay}
                      className="btn-outline text-sm py-2 px-4"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Day
                    </button>
                  </div>

                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {(formData.itinerary || []).map((day, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800">
                            Day {day.day}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItineraryDay(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Day title"
                            value={day.title}
                            onChange={(e) =>
                              updateItineraryDay(index, "title", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                          />
                          <textarea
                            placeholder="Day description"
                            rows={2}
                            value={day.description}
                            onChange={(e) =>
                              updateItineraryDay(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 resize-vertical"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter each feature on a new line. Press Enter to go to next line:

Professional guide
Transportation included
Meals provided
Airport transfers
Professional photographer"
                    value={formData.features?.join("\n") || ""}
                    onChange={(e) =>
                      handleArrayInput("features", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-vertical font-mono text-sm"
                    style={{ minHeight: "150px", whiteSpace: "pre-wrap" }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Press Enter to add a new line. Each line will be a
                    separate feature.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inclusions (one per line)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter each inclusion on a new line. Press Enter to go to next line:

Accommodation (twin sharing)
All meals (breakfast, lunch, dinner)
Airport transfers
Entry fees to monuments
Professional guide"
                    value={formData.inclusions?.join("\n") || ""}
                    onChange={(e) =>
                      handleArrayInput("inclusions", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-vertical font-mono text-sm"
                    style={{ minHeight: "150px", whiteSpace: "pre-wrap" }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Press Enter to add a new line. Each line will be a
                    separate inclusion.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exclusions (one per line)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter each exclusion on a new line. Press Enter to go to next line:

International flights
Personal expenses
Travel insurance
Tips for guide and driver
Alcoholic beverages"
                    value={formData.exclusions?.join("\n") || ""}
                    onChange={(e) =>
                      handleArrayInput("exclusions", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-vertical font-mono text-sm"
                    style={{ minHeight: "150px", whiteSpace: "pre-wrap" }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Press Enter to add a new line. Each line will be a
                    separate exclusion.
                  </p>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : editingPackage
                      ? "Update Package"
                      : "Add Package"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
