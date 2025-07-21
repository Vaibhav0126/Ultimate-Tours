"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";

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

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const fetchFeaturedPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/packages");
      if (response.ok) {
        const data = await response.json();
        // Show first 3 packages
        const featuredPackages = data.slice(0, 3);
        setPackages(featuredPackages);
      }
    } catch (error) {
      console.error("Error fetching featured packages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Packages
            </h2>
            <p className="text-xl text-gray-600">
              Loading our best travel packages...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the most popular and
            highly-rated tour packages
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No packages available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative overflow-hidden bg-gray-200">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const parentDiv = img.parentElement as HTMLElement;
                      if (parentDiv) {
                        const errorDiv = document.createElement("div");
                        errorDiv.className =
                          "absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center";
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
                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{pkg.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {pkg.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {feature}
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">
                          {pkg.duration}
                        </span>
                      </div>
                      <div className="text-right">
                        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                          <div className="text-sm text-gray-500 line-through mb-1">
                            ₹{pkg.originalPrice.toLocaleString("en-IN")}
                          </div>
                        )}
                        <div className="flex items-center justify-end space-x-1">
                          <span className="text-2xl font-bold text-primary-600">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          per person
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="w-full btn-primary text-center block group"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="btn-outline inline-flex items-center"
          >
            View All Packages
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
