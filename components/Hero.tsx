import Link from "next/link";
import { ArrowRight, MapPin, Users, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 7 Wonders of the World images (local)
  const wondersImages = [
    {
      url: "/images/taj.jpg",
      title: "Taj Mahal, India",
    },
    {
      url: "/images/machu.jpg",
      title: "Machu Picchu, Peru",
    },
    {
      url: "/images/christ.jpg",
      title: "Christ the Redeemer, Brazil",
    },
    {
      url: "/images/chichen.jpg",
      title: "Chichen Itza, Mexico",
    },
    {
      url: "/images/colosseum.jpg",
      title: "Colosseum, Italy",
    },
    {
      url: "/images/china.jpg",
      title: "Great Wall of China",
    },
    {
      url: "/images/petra.jpg",
      title: "Petra, Jordan",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % wondersImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden min-h-[60vh] md:min-h-[80vh]">
      {/* Sliding Background Images */}
      <div className="absolute inset-0">
        {wondersImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image.url}')`,
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {wondersImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-yellow-400 scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Current wonder name - Mobile optimized */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2">
          <p className="text-xs md:text-sm text-yellow-400 font-medium">
            {wondersImages[currentSlide].title}
          </p>
        </div>
      </div>

      <div className="relative container-max section-padding z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Discover the World with
            <span className="text-yellow-400"> Ultimate Tours</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-200 px-2">
            Your trusted partner for unforgettable travel experiences. From
            dream destinations to seamless logistics.
          </p>

          {/* Stats - Mobile optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10 px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 md:h-8 w-6 md:w-8 text-yellow-400" />
              </div>
              <div className="text-xl md:text-2xl font-bold">10,000+</div>
              <div className="text-gray-200 text-sm md:text-base">
                Happy Travelers
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-6 md:h-8 w-6 md:w-8 text-yellow-400" />
              </div>
              <div className="text-xl md:text-2xl font-bold">150+</div>
              <div className="text-gray-200 text-sm md:text-base">
                Destinations
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 md:h-8 w-6 md:w-8 text-yellow-400" />
              </div>
              <div className="text-xl md:text-2xl font-bold">4.9/5</div>
              <div className="text-gray-200 text-sm md:text-base">
                Customer Rating
              </div>
            </div>
          </div>

          {/* CTA Buttons - Mobile optimized */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link
              href="/packages"
              className="bg-yellow-500 text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center text-sm md:text-base"
            >
              Explore Tour Packages
              <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-800 transition-all duration-200 text-sm md:text-base"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
