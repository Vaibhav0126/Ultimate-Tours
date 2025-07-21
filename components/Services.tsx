import {
  Plane,
  MapPin,
  FileText,
  Building,
  Shield,
  Train,
  DollarSign,
  Globe,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Tour Packages",
      description:
        "Curated local and international tour packages for every budget and preference.",
      color: "bg-blue-500",
    },
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Air Tickets",
      description: "Competitive airfare deals with major airlines.",
      color: "bg-green-500",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "VISA Services",
      description: "Hassle-free visa processing for all destinations.",
      color: "bg-purple-500",
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Hotel Bookings",
      description: "Comfortable accommodations from budget to luxury hotels.",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="relative section-padding bg-gray-50">
      {/* Dark overlay for better text readability */}
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Complete Travel Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide end-to-end travel services to make your journey seamless
            and memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`${service.color} text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors duration-200 inline-block"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function Link({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
