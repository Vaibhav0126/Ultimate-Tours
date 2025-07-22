import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const services = [
    "Tour Packages",
    "Air Tickets",
    "Visa Services",
    "Hotel Bookings",
    "Travel Insurance",
    "Railway Tickets",
    "Money Exchange",
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Tour Packages", href: "/packages" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/icons/logo.svg"
                alt="Ultimate Tours"
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">Ultimate Tours</h3>
                <p className="text-gray-400 text-sm">Catch Your Smile</p>
              </div>
            </div>
            <p className="text-gray-300">
              We provide comprehensive travel solutions to make your journey
              memorable and hassle-free. From tour packages to travel insurance,
              we've got you covered.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100054243530664"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/_ultimate_tours_?igsh=MXhyc3M2dzVkbGVrYw=="
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary-500" />
                <span className="text-gray-300">+91 98039-29900</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary-500" />
                <span className="text-gray-300">ultimatetours1@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary-500 mt-1" />
                <span className="text-gray-300">
                  SCO-70, Mugal Canal,
                  <br />
                  Karnal, 132001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2015 Ultimate Tours. All rights reserved. | Privacy Policy | Terms
            & Conditions
          </p>
        </div>
      </div>
    </footer>
  );
}
