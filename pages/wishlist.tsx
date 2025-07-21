"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  X,
  MapPin,
  Clock,
  User,
  ShoppingBag,
  ArrowLeft,
  Send,
} from "lucide-react";
import { useUserAuth } from "@/contexts/UserAuthContext";
import InquiryModal from "@/components/InquiryModal";

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  location: string;
  category: string;
  image: string;
  maxGroupSize: number;
  difficulty: string;
}

export default function Wishlist() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, removeFromWishlist } =
    useUserAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [removingPackage, setRemovingPackage] = useState<string | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signin");
      return;
    }

    if (user?.wishlist) {
      fetchWishlistPackages();
    } else {
      setLoadingPackages(false);
    }
  }, [user, isAuthenticated, isLoading, router]);

  const fetchWishlistPackages = async () => {
    if (!user?.wishlist?.length) {
      setLoadingPackages(false);
      return;
    }

    try {
      // Fetch package details for each wishlist item
      const packagePromises = user.wishlist.map(async (item) => {
        const response = await fetch(`/api/packages/${item.packageId}`);
        if (response.ok) {
          return await response.json();
        }
        return null;
      });

      const packageResults = await Promise.all(packagePromises);
      const validPackages = packageResults.filter((pkg) => pkg !== null);
      setPackages(validPackages);
    } catch (error) {
      console.error("Error fetching wishlist packages:", error);
    } finally {
      setLoadingPackages(false);
    }
  };

  const handleRemoveFromWishlist = async (packageId: string) => {
    setRemovingPackage(packageId);
    try {
      const success = await removeFromWishlist(packageId);
      if (success) {
        // Remove from local state
        setPackages(packages.filter((pkg) => pkg.id !== packageId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setRemovingPackage(null);
    }
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  };

  const getSelectedPackagesData = () => {
    return packages
      .filter((pkg) => selectedPackages.includes(pkg.id))
      .map((pkg) => ({
        id: pkg.id,
        title: pkg.title,
        price: `₹${pkg.price.toLocaleString("en-IN")}`,
      }));
  };

  if (isLoading || loadingPackages) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Profile
              </Link>
            </div>
            <Link
              href="/packages"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse More Packages
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">
                {packages.length}{" "}
                {packages.length === 1 ? "package" : "packages"} saved for later
              </p>
            </div>
          </div>
        </div>

        {/* Multiple Package Inquiry */}
        {packages.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Interested in Multiple Packages?
                </h3>
                <p className="text-gray-600 text-sm">
                  Select packages and send a combined inquiry
                </p>
              </div>
              <button
                onClick={() => setShowInquiryModal(true)}
                disabled={selectedPackages.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Inquiry ({selectedPackages.length})
              </button>
            </div>
            {selectedPackages.length > 0 && (
              <div className="text-sm text-gray-600">
                Selected:{" "}
                {getSelectedPackagesData()
                  .map((pkg) => pkg.title)
                  .join(", ")}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring our amazing travel packages and save your
              favorites for later!
            </p>
            <Link
              href="/packages"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Packages
            </Link>
          </div>
        )}

        {/* Packages Grid */}
        {packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-all ${
                  selectedPackages.includes(pkg.id)
                    ? "border-primary-500 ring-2 ring-primary-100"
                    : "border-gray-200"
                }`}
              >
                {/* Package Selection Checkbox */}
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg.id)}
                      onChange={() => handlePackageSelect(pkg.id)}
                      className="h-5 w-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                  </div>

                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleRemoveFromWishlist(pkg.id)}
                      disabled={removingPackage === pkg.id}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
                      title="Remove from wishlist"
                    >
                      {removingPackage === pkg.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <X className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                      )}
                    </button>
                  </div>

                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                        {Math.round(
                          ((pkg.originalPrice - pkg.price) /
                            pkg.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        pkg.category === "international"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {pkg.category === "international"
                        ? "International"
                        : "Domestic"}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {pkg.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {pkg.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      Max {pkg.maxGroupSize} people
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{pkg.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {packages.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Wishlist Summary
                </h3>
                <p className="text-gray-600">
                  {packages.length} packages • Total value: $
                  {packages.reduce((sum, pkg) => sum + pkg.price, 0)}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href="/packages"
                  className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100"
                >
                  Browse More
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Contact for Booking
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Wishlist Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
          packageTitle={`${selectedPackages.length} Wishlist Packages`}
          travelers={1}
          dateFrom=""
          dateTo=""
          totalPrice=""
          packages={getSelectedPackagesData()}
          onSuccess={() => {
            setSelectedPackages([]);
          }}
        />
      )}
    </div>
  );
}
