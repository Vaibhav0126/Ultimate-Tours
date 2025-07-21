"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Users,
  MapPin,
  Check,
  X,
  Calendar,
  ArrowLeft,
  Mountain,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import WishlistButton from "@/components/WishlistButton";
import InquiryModal from "@/components/InquiryModal";

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

export default function PackageDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [pkg, setPkg] = useState<Package | null>(null);
  const [relatedPackages, setRelatedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "itinerary" | "inclusions"
  >("overview");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    if (id) {
      fetchPackage(id as string);
      fetchRelatedPackages();
    }
  }, [id]);

  const fetchPackage = async (packageId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/packages/${packageId}`);
      if (response.ok) {
        const data = await response.json();
        setPkg(data);
      } else {
        console.error("Package not found");
      }
    } catch (error) {
      console.error("Error fetching package:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPackages = async () => {
    try {
      const response = await fetch("/api/packages");
      if (response.ok) {
        const data = await response.json();
        setRelatedPackages(data.slice(0, 3)); // Show 3 related packages
      }
    } catch (error) {
      console.error("Error fetching related packages:", error);
    }
  };

  const calculateTotal = () => {
    return pkg ? pkg.price * travelers : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600">Loading package details...</div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Package Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The package you're looking for doesn't exist.
          </p>
          <Link href="/packages" className="btn-primary">
            Browse All Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const parentDiv = img.parentElement as HTMLElement;
            if (parentDiv) {
              parentDiv.style.background =
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            }
          }}
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="container-max h-full flex items-end pb-8">
            <div className="text-white">
              <Link
                href="/packages"
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Packages
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {pkg.title}
              </h1>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {pkg.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {pkg.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Max {pkg.maxGroupSize} people
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pkg.category === "local"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {pkg.category === "local"
                      ? "Domestic Tour"
                      : "International Tour"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary-600">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{pkg.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">per person</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">
                    Duration
                  </div>
                  <div className="text-sm text-gray-600">{pkg.duration}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">
                    Group Size
                  </div>
                  <div className="text-sm text-gray-600">
                    Max {pkg.maxGroupSize}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Mountain className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">
                    Difficulty
                  </div>
                  <div className="text-sm text-gray-600">{pkg.difficulty}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">
                    Best Time
                  </div>
                  <div className="text-sm text-gray-600">{pkg.bestTime}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  {[
                    { key: "overview", label: "Overview", icon: Info },
                    { key: "itinerary", label: "Itinerary", icon: Clock },
                    { key: "inclusions", label: "Inclusions", icon: Check },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as typeof activeTab)}
                      className={`flex-1 flex items-center justify-center py-4 px-6 font-medium transition-colors ${
                        activeTab === tab.key
                          ? "text-primary-600 border-b-2 border-primary-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        About This Package
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image Gallery */}
                    {pkg.images && pkg.images.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Gallery
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {pkg.images
                            .filter((image) => image && image.trim())
                            .map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image}
                                  alt={`${pkg.title} ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border"
                                  onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.style.display = "none";
                                    const errorDiv =
                                      img.nextElementSibling as HTMLElement;
                                    if (errorDiv)
                                      errorDiv.style.display = "flex";
                                  }}
                                />
                                <div className="absolute inset-0 bg-gray-100 rounded-lg border flex items-center justify-center text-gray-500 text-sm hidden">
                                  <div className="text-center">
                                    <svg
                                      className="h-6 w-6 mx-auto mb-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span>Image not available</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === "itinerary" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      Day by Day Itinerary
                    </h3>
                    {pkg.itinerary && pkg.itinerary.length > 0 ? (
                      <div className="space-y-6">
                        {pkg.itinerary.map((day, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-primary-600 pl-6"
                          >
                            <div className="flex items-center mb-2">
                              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                                Day {day.day}
                              </span>
                              <h4 className="text-lg font-semibold text-gray-800">
                                {day.title}
                              </h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                              {day.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        Detailed itinerary will be provided upon booking.
                      </p>
                    )}
                  </div>
                )}

                {/* Inclusions Tab */}
                {activeTab === "inclusions" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <Check className="h-6 w-6 text-green-600 mr-2" />
                        What's Included
                      </h3>
                      <div className="space-y-3">
                        {pkg.inclusions.map((inclusion, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{inclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <X className="h-6 w-6 text-red-600 mr-2" />
                        What's Not Included
                      </h3>
                      <div className="space-y-3">
                        {pkg.exclusions.map((exclusion, index) => (
                          <div key={index} className="flex items-start">
                            <X className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{exclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Package Information
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Date From
                  </label>
                  <input
                    type="date"
                    value={selectedDateFrom}
                    onChange={(e) => setSelectedDateFrom(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {[...Array(pkg.maxGroupSize)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "Person" : "People"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    ₹{pkg.price.toLocaleString("en-IN")} × {travelers} traveler
                    {travelers > 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold">
                    ₹{calculateTotal().toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ₹{calculateTotal().toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowInquiryModal(true)}
                className="w-full btn-primary mb-4"
              >
                Send Inquiry
              </button>

              <div className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <WishlistButton packageId={pkg.id} size="md" className="mr-2" />
                <span className="font-medium text-gray-700">
                  Add to Wishlist
                </span>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Our travel experts are here to help you plan your perfect
                  trip.
                </p>
                <Link
                  href="/contact"
                  className="text-primary-600 text-sm font-medium"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPackages
                .filter((p) => p.id !== pkg.id)
                .slice(0, 3)
                .map((relatedPkg) => (
                  <div
                    key={relatedPkg.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <img
                      src={relatedPkg.image}
                      alt={relatedPkg.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {relatedPkg.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{relatedPkg.location}</span>
                      </div>
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">
                              {relatedPkg.duration}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-primary-600 font-bold">
                              ₹{relatedPkg.price.toLocaleString("en-IN")}
                            </div>
                            <span className="text-xs text-gray-500">
                              per person
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/packages/${relatedPkg.id}`}
                          className="flex-1 btn-outline text-center block"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
          packageTitle={pkg.title}
          packageId={pkg.id}
          travelers={travelers}
          dateFrom={selectedDateFrom}
          totalPrice={`₹${calculateTotal().toLocaleString("en-IN")}`}
          onSuccess={() => {
            // Optional: show success message or redirect
          }}
        />
      )}
    </div>
  );
}
