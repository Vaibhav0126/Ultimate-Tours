"use client";

import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  totalRatings?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export default function RatingDisplay({
  rating,
  totalRatings,
  size = "md",
  showNumber = true,
  className = "",
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className={`${sizeClasses[size]} text-yellow-400 fill-current`}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${sizeClasses[size]} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star
              className={`${sizeClasses[size]} text-yellow-400 fill-current`}
            />
          </div>
        </div>
      );
    }

    // Empty stars
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className={`${sizeClasses[size]} text-gray-300`}
        />
      );
    }

    return stars;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex items-center">{renderStars()}</div>
      {showNumber && (
        <div
          className={`flex items-center space-x-1 ${textSizeClasses[size]} text-gray-600`}
        >
          <span className="font-medium">{rating.toFixed(1)}</span>
          {totalRatings !== undefined && (
            <span>
              ({totalRatings} review{totalRatings !== 1 ? "s" : ""})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
