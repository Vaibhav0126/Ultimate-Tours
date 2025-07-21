"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Heart } from "lucide-react";
import { useUserAuth } from "@/contexts/UserAuthContext";

interface WishlistButtonProps {
  packageId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WishlistButton({
  packageId,
  size = "md",
  className = "",
}: WishlistButtonProps) {
  const { isAuthenticated, isInWishlist, addToWishlist, removeFromWishlist } =
    useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isWishlisted = isInWishlist(packageId);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const buttonSizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    setIsLoading(true);

    try {
      if (isWishlisted) {
        await removeFromWishlist(packageId);
      } else {
        await addToWishlist(packageId);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        ${buttonSizeClasses[size]}
        rounded-full
        transition-all duration-200
        ${
          isWishlisted
            ? "bg-red-100 text-red-600 hover:bg-red-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
        ${className}
      `}
      title={
        !isAuthenticated
          ? "Login to add to wishlist"
          : isWishlisted
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
    >
      <Heart
        className={`
          ${sizeClasses[size]} 
          transition-all duration-200
          ${isWishlisted ? "fill-current" : ""}
        `}
      />
    </button>
  );
}
