import { MapPin, Users, Award, Clock } from "lucide-react";
import CustomerDiaries from "../components/CustomerDiaries";

export default function About() {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "10,000+",
      label: "Happy Customers",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      number: "150+",
      label: "Destinations",
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "15+",
      label: "Years Experience",
    },
    { icon: <Clock className="h-8 w-8" />, number: "24/7", label: "Support" },
  ];

  const team = [
    {
      name: "Sushil Kumar",
      role: "Founder & CEO",
      image: "/images/rinku.png",
      bio: "Started Ultimate Tours in 2015 after two years in travel industry.",
    },
    {
      name: "Vaibhav",
      role: "CTO and Web Developer",
      image: "/images/Vaibhav.jpg",
      bio: "Full-stack engineer shaping the digital presence of Ultimate Tours worldwide.",
    },
    {
      name: "Rimjhim Keer",
      role: "UI/UX Designer",
      image: "/images/Rim.jpeg",
      bio: "Designs user-focused travel experiences through thoughtful UI and branding.",
    },
    {
      name: "Saijal",
      role: "Legal Advisor",
      image: "/images/kuki.jpg",
      bio: "Provides legal guidance with a sharp mind and passion for travel.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-white section-padding bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/tourism4.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Ultimate Tours
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Your trusted travel partner since 2015, creating unforgettable
              experiences across the globe
            </p>
          </div>
        </div>
      </section>
      {/* Company Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2009 in the vibrant city of Jalandhar, Ultimate
                  Tours began with a clear and timely mission: to make travel
                  accessible, enjoyable, and unforgettable for everyone. At a
                  time when online travel platforms were still scarce and travel
                  planning was often complicated, our founder Sushil Kumar
                  recognized a growing demand for reliable, personalized travel
                  services in India.
                </p>
                <p>
                  Driven by his passion for exploration and a deep understanding
                  of traveler needs, Sushil launched Ultimate Tours as a small,
                  local tour operator—focused on creating seamless travel
                  experiences for families, solo adventurers, and groups alike.
                  What started as a modest venture quickly gained momentum,
                  thanks to a commitment to service excellence, transparency,
                  and customer-first values.
                </p>
                <p>
                  Over the years, Ultimate Tours has evolved into a full-service
                  travel agency with a global footprint. We’ve built strong,
                  trusted relationships with hotels, airlines, and local
                  partners across 150+ destinations worldwide, ensuring that
                  every journey we plan delivers unmatched value and comfort.
                </p>
                <p>
                  Our dedicated team of travel professionals is passionate about
                  crafting experiences that go far beyond the ordinary. Whether
                  it’s a luxury getaway, an adventure trek, or a cultural
                  exploration, we believe travel has the power to transform
                  lives, broaden horizons, and create stories worth telling.
                </p>
                <p>
                  At Ultimate Tours, we don’t just book trips—we design memories
                  that last a lifetime.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/rinku.png"
                alt="Rinku"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section
        className="bg-primary-600 text-white section-padding"
        style={{
          backgroundImage: "url('/images/tourism7.jpg')",
        }}
      >
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-yellow-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To provide exceptional travel experiences that inspire, educate,
                and create lasting memories while ensuring the highest standards
                of service, safety, and sustainability.
              </p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be the world's most trusted travel partner, known for our
                innovation, expertise, and commitment to making travel dreams
                come true for people from all walks of life.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team of travel professionals is dedicated to
              making your journey extraordinary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h4>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Customer Diaries */}
      {/* <CustomerDiaries /> */}
    </div>
  );
}
