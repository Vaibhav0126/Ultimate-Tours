"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, Users, Search, Filter } from "lucide-react";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton";

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

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "local" | "international"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "duration">("price");

  useEffect(() => {
    fetchPackages();
  }, []);

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

  const filteredPackages = packages
    .filter((pkg) => {
      const matchesCategory =
        selectedCategory === "all" || pkg.category === selectedCategory;
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "duration":
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/tourism2.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container-max py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore Our Tour Packages
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover amazing destinations with our carefully crafted tour
              packages
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value as "all" | "local" | "international"
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="local">Domestic Packages</option>
              <option value="international">International Packages</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "price" | "duration")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="price">Sort by Price</option>
              <option value="duration">Sort by Duration</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-gray-600">
              <Filter className="h-5 w-5 mr-2" />
              {filteredPackages.length} packages found
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading packages...</div>
          </div>
        )}

        {/* Packages Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative bg-gray-200">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const parentDiv = img.parentElement as HTMLElement;
                      if (parentDiv) {
                        const errorDiv = document.createElement("div");
                        errorDiv.className =
                          "absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center";
                        errorDiv.innerHTML = `
                          <div class="text-center text-gray-500">
                            <svg class="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p class="text-sm">Image not available</p>
                          </div>
                        `;
                        parentDiv.appendChild(errorDiv);
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pkg.category === "local"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {pkg.category === "local" ? "Domestic" : "International"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {Math.round(
                          ((pkg.originalPrice - pkg.price) /
                            pkg.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                    <WishlistButton
                      packageId={pkg.id}
                      size="md"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{pkg.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {pkg.maxGroupSize} max
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">
                          {pkg.duration}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary-600">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </span>
                          {pkg.originalPrice &&
                            pkg.originalPrice > pkg.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{pkg.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                        </div>
                        <span className="text-xs text-gray-500">
                          per person
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="flex-1 btn-primary text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No packages found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all packages
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
