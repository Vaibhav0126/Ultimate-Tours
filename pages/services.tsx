import Link from "next/link";
import {
  Plane,
  MapPin,
  FileText,
  Building,
  Shield,
  Train,
  DollarSign,
  Globe,
  Clock,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";

export default function Services() {
  const mainServices = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Tour Packages",
      description:
        "Curated local and international tour packages designed for every type of traveler.",
      features: [
        "Custom Itineraries",
        "Group & Private Tours",
        "Expert Local Guides",
        "Best Price Guarantee",
      ],
      color: "bg-blue-500",
      link: "/packages",
    },
    {
      icon: <Plane className="h-12 w-12" />,
      title: "Air Tickets",
      description:
        "Competitive airfare deals with major airlines for domestic and international flights.",
      features: [
        "Best Fare Guarantee",
        "Flexible Booking",
        "24/7 Support",
        "Group Discounts",
      ],
      color: "bg-green-500",
      link: "/contact",
    },
    {
      icon: <FileText className="h-12 w-12" />,
      title: "VISA Services",
      description:
        "Hassle-free visa processing and documentation assistance for all destinations.",
      features: [
        "Document Preparation",
        "Application Tracking",
        "Fast Processing",
        "Expert Consultation",
      ],
      color: "bg-purple-500",
      link: "/contact",
    },
    {
      icon: <Building className="h-12 w-12" />,
      title: "Hotel Bookings",
      description:
        "Comfortable accommodations from budget-friendly to luxury hotels worldwide.",
      features: [
        "Best Rate Guarantee",
        "Instant Confirmation",
        "Free Cancellation",
        "Special Deals",
      ],
      color: "bg-orange-500",
      link: "/contact",
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Travel Insurance",
      description:
        "Comprehensive travel insurance coverage for peace of mind during your journey.",
      features: [
        "Medical Coverage",
        "Trip Cancellation",
        "Lost Baggage",
        "24/7 Assistance",
      ],
      color: "bg-red-500",
      link: "/contact",
    },
    {
      icon: <Train className="h-12 w-12" />,
      title: "Railway Tickets",
      description:
        "Convenient railway bookings for domestic travel with all major rail networks.",
      features: [
        "Online Booking",
        "Seat Selection",
        "Meal Preferences",
        "Group Bookings",
      ],
      color: "bg-indigo-500",
      link: "/contact",
    },
    {
      icon: <DollarSign className="h-12 w-12" />,
      title: "Money Exchange",
      description:
        "Best exchange rates for foreign currencies with secure and reliable service.",
      features: [
        "Competitive Rates",
        "Multiple Currencies",
        "Secure Transactions",
        "Door Delivery",
      ],
      color: "bg-teal-500",
      link: "/contact",
    },
    {
      icon: <MapPin className="h-12 w-12" />,
      title: "Travel Consultation",
      description:
        "Expert advice and personalized travel planning from our experienced consultants.",
      features: [
        "Personalized Planning",
        "Destination Expertise",
        "Budget Optimization",
        "Ongoing Support",
      ],
      color: "bg-pink-500",
      link: "/contact",
    },
  ];

  const whyChooseUs = [
    {
      icon: <Star className="h-8 w-8" />,
      title: "Expert Knowledge",
      description:
        "Our team has extensive knowledge of destinations and travel requirements.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trusted Service",
      description:
        "Over 10 years of experience serving thousands of satisfied customers.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance for all your travel needs and emergencies.",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Best Prices",
      description:
        "Competitive pricing with transparent costs and no hidden charges.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-white section-padding bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/tourism3.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Complete travel solutions for all your journey needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Complete Travel Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From planning to execution, we handle every aspect of your travel
              to ensure a seamless experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="card group hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`${service.color} text-white p-4 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.link}
                  className="btn-outline w-full text-center block"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Ultimate Tours?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our professional and personalized
              travel services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="text-primary-600 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple and efficient process ensures your travel planning is
              stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description:
                  "Share your travel preferences and requirements with our experts.",
              },
              {
                step: "02",
                title: "Planning",
                description:
                  "We create a customized travel plan based on your needs and budget.",
              },
              {
                step: "03",
                title: "Booking",
                description:
                  "Secure all bookings with confirmed reservations and documentation.",
              },
              {
                step: "04",
                title: "Support",
                description:
                  "Enjoy 24/7 support during your travel for any assistance needed.",
              },
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform -translate-x-1/2" />
                )}
                <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-gradient-to-r  text-white section-padding"
        style={{
          backgroundImage: "url('/images/tourism7.jpg')",
        }}
      >
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our travel experts today and let us help you plan the
            perfect trip
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/packages"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Browse Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
