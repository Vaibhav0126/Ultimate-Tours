"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { useUserAuth } from "@/contexts/UserAuthContext";
import { Menu, X, MapPin, Phone, Mail, User, LogOut } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUserAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    // Call our custom logout to clear JWT tokens and user state
    logout();
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tour Packages", href: "/packages" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar - Mobile optimized */}
      <div
        className="bg-primary-800 text-white py-2 hidden md:block"
        style={{
          backgroundImage: "url('/images/tourism7.jpg')",
        }}
      >
        <div className="container-max flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+91 98039-29900</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>ultimatetours1@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Serving Worldwide</span>
          </div>
        </div>
      </div>

      {/* Mobile-only compact top bar */}
      <div className="md:hidden bg-primary-800 text-white py-1.5 text-center text-xs">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Phone className="h-3 w-3" />
            <span>+91 98039-29900</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>Serving Worldwide</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-max">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo - Mobile optimized */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3">
            <img
              src="/icons/logoT.svg"
              alt="Ultimate Tours"
              className="h-8 md:h-12 w-auto"
            />
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Ultimate Tours
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                Catch Your Smile
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* Authentication Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center ">
                <Link
                  href="/signin"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Improved */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium py-3 px-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Authentication Section */}
              <div className="border-t pt-4 mt-4">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700 font-medium py-2 px-2">
                      <User className="h-5 w-5" />
                      <span className="truncate">{user.name}</span>
                    </div>
                    <Link
                      href="/profile"
                      className="block text-gray-700 hover:text-primary-600 hover:bg-gray-50 py-3 px-2 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block text-gray-700 hover:text-primary-600 hover:bg-gray-50 py-3 px-2 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 py-3 px-2 rounded-lg transition-all duration-200 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/signin"
                      className="block text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium py-3 px-2 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 text-center shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
