import {
  Shield,
  Clock,
  Globe,
  HeartHandshake,
  Award,
  Headphones,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trusted & Secure",
      description:
        "100% secure payments and verified travel partners for your peace of mind.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you throughout your journey.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description:
        "Extensive network of partners worldwide for seamless travel experiences.",
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Personalized Service",
      description:
        "Customized travel solutions tailored to your preferences and budget.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Best Prices",
      description:
        "Competitive pricing with no hidden charges and best value guarantees.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Expert Guidance",
      description:
        "Professional travel consultants with years of industry experience.",
    },
  ];

  return (
    <section
      className="relative section-padding bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/tourism1.jpg')",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Ultimate Tours?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With years of experience and thousands of satisfied customers, we're
            your ideal travel partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="text-primary-600 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 mt-16 text-center shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Adventure?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our travel experts help you plan the perfect trip. Contact us
            today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 inline-block"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/packages"
              className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-600 hover:text-white transition-all duration-200 inline-block"
            >
              Browse Packages
            </Link>
          </div>
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
