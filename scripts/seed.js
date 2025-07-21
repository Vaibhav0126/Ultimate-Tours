const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

// Connect to MongoDB Atlas using environment variable
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/ultimate-tours",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Package schema
const packageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: ["local", "international"],
      required: true,
    },
    image: { type: String, required: true },
    images: [{ type: String }],
    features: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0 },
    maxGroupSize: { type: Number, required: true },
    difficulty: { type: String, required: true },
    bestTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);

// Sample data
const samplePackages = [
  {
    id: "local-1",
    title: "Kerala Backwaters Adventure",
    description:
      "Experience the serene beauty of Kerala's backwaters with our comprehensive tour package. Navigate through tranquil canals, witness local life, and enjoy authentic cuisine while staying in traditional houseboats.",
    price: 450,
    originalPrice: 550,
    duration: "4 Days / 3 Nights",
    location: "Alleppey, Kerala",
    category: "local",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    ],
    features: [
      "Traditional Houseboat Stay",
      "Authentic Kerala Cuisine",
      "Professional Guide",
      "Transportation Included",
      "Sunset Cruise Experience",
    ],
    inclusions: [
      "3 nights accommodation in premium houseboat",
      "All meals (breakfast, lunch, dinner)",
      "Professional English-speaking guide",
      "Airport transfers",
      "Sightseeing as per itinerary",
      "Traditional Kathakali dance show",
    ],
    exclusions: [
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance",
      "Camera fees at monuments",
      "Any meals not mentioned",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Alleppey",
        description:
          "Arrive in Alleppey and check into your traditional houseboat. Enjoy welcome drinks and traditional Kerala lunch. In the afternoon, cruise through the backwaters and witness the local village life. Evening sunset cruise with dinner on board.",
      },
      {
        day: 2,
        title: "Backwater Exploration",
        description:
          "Early morning bird watching cruise. Visit local villages and interact with fishermen. Afternoon cooking demonstration of Kerala cuisine. Evening cultural program with Kathakali dance performance.",
      },
      {
        day: 3,
        title: "Village Tour & Spice Gardens",
        description:
          "Morning visit to local spice gardens and coconut groves. Afternoon village tour by canoe. Experience traditional toddy tapping and coir making. Evening leisure time on houseboat.",
      },
      {
        day: 4,
        title: "Departure",
        description:
          "Morning breakfast and checkout. Optional visit to local markets for souvenir shopping. Transfer to airport or railway station for departure.",
      },
    ],
    rating: 4.8,
    reviewCount: 247,
    maxGroupSize: 8,
    difficulty: "Easy",
    bestTime: "October to March",
  },
  {
    id: "local-2",
    title: "Goa Beach Holiday",
    description:
      "Discover the golden beaches of Goa with our exciting beach holiday package. Enjoy water sports, vibrant nightlife, Portuguese heritage, and delicious seafood in this tropical paradise.",
    price: 380,
    originalPrice: 450,
    duration: "5 Days / 4 Nights",
    location: "North & South Goa",
    category: "local",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500",
    ],
    features: [
      "Beach Resort Stay",
      "Water Sports Activities",
      "Heritage Tours",
      "Seafood Experiences",
      "Nightlife Access",
    ],
    inclusions: [
      "4 nights in beachfront resort",
      "Daily breakfast and dinner",
      "Airport transfers",
      "Sightseeing tours",
      "Water sports activities",
      "Spice plantation visit",
    ],
    exclusions: [
      "Lunch (except on tour days)",
      "Personal expenses",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & North Goa Beaches",
        description:
          "Arrive in Goa and check into beachfront resort. Afternoon visit to famous North Goa beaches - Baga, Calangute, and Anjuna. Evening at leisure to explore local markets and try Goan cuisine.",
      },
      {
        day: 2,
        title: "Water Sports & Portuguese Heritage",
        description:
          "Morning water sports activities including parasailing, jet skiing, and banana boat rides. Afternoon tour of Old Goa visiting Basilica of Bom Jesus and Se Cathedral. Evening sunset cruise on Mandovi River.",
      },
      {
        day: 3,
        title: "South Goa & Spice Plantation",
        description:
          "Full day tour of South Goa beaches including Colva and Palolem. Visit to spice plantation with traditional Goan lunch. Evening free for shopping at local markets.",
      },
      {
        day: 4,
        title: "Adventure & Nightlife",
        description:
          "Morning dudhsagar waterfall excursion (seasonal). Afternoon at leisure for spa treatments or beach activities. Evening experience of Goan nightlife with casino visit.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning checkout and final shopping. Transfer to airport for departure with wonderful memories of Goa.",
      },
    ],
    rating: 4.6,
    reviewCount: 189,
    maxGroupSize: 12,
    difficulty: "Easy",
    bestTime: "November to February",
  },
  {
    id: "international-1",
    title: "Golden Triangle India",
    description:
      "Explore India's most iconic destinations - Delhi, Agra, and Jaipur. This classic tour covers UNESCO World Heritage sites, magnificent palaces, and rich cultural experiences in the heartland of India.",
    price: 899,
    originalPrice: 1099,
    duration: "8 Days / 7 Nights",
    location: "Delhi, Agra, Jaipur",
    category: "international",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500",
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500",
    ],
    features: [
      "UNESCO World Heritage Sites",
      "Taj Mahal Sunrise Visit",
      "Royal Palaces Tour",
      "Cultural Experiences",
      "Luxury Accommodations",
    ],
    inclusions: [
      "7 nights in 4-star hotels",
      "Daily breakfast and dinner",
      "Private air-conditioned vehicle",
      "Professional English guide",
      "All entrance fees",
      "Airport transfers",
    ],
    exclusions: [
      "International flights",
      "India visa fees",
      "Lunch (except on specified days)",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description:
          "Arrive at Delhi International Airport. Meet and greet by our representative. Transfer to hotel and check-in. Evening at leisure to recover from jet lag. Welcome dinner at hotel.",
      },
      {
        day: 2,
        title: "Old & New Delhi Sightseeing",
        description:
          "Full day Delhi city tour covering Red Fort, Jama Masjid, Raj Ghat, India Gate, President's House, and Qutub Minar. Experience rickshaw ride in Chandni Chowk. Evening cultural show.",
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description:
          "Morning drive to Agra (4 hours). Check into hotel and lunch. Afternoon visit to Agra Fort and local markets. Evening sunset view of Taj Mahal from Mehtab Bagh.",
      },
      {
        day: 4,
        title: "Taj Mahal & Fatehpur Sikri",
        description:
          "Early morning sunrise visit to Taj Mahal. Return to hotel for breakfast. Later visit Fatehpur Sikri, the abandoned Mughal city. Evening at leisure for shopping.",
      },
      {
        day: 5,
        title: "Agra to Jaipur",
        description:
          "Morning drive to Jaipur (5 hours) with lunch en route. Check into hotel. Evening visit to local bazaars for shopping. Traditional Rajasthani dinner with folk dance performance.",
      },
      {
        day: 6,
        title: "Jaipur City Tour",
        description:
          "Morning elephant ride at Amber Fort. Visit City Palace, Jantar Mantar, and Hawa Mahal. Afternoon cooking class with local family. Evening at leisure.",
      },
      {
        day: 7,
        title: "Jaipur to Delhi",
        description:
          "Morning at leisure for shopping at local markets. Afternoon drive back to Delhi (5 hours). Check into hotel near airport. Farewell dinner.",
      },
      {
        day: 8,
        title: "Departure",
        description:
          "Transfer to airport for international departure. End of memorable Golden Triangle tour.",
      },
    ],
    rating: 4.9,
    reviewCount: 342,
    maxGroupSize: 15,
    difficulty: "Moderate",
    bestTime: "October to March",
  },
  {
    id: "international-2",
    title: "Swiss Alps Adventure",
    description:
      "Experience the breathtaking beauty of the Swiss Alps with scenic train rides, pristine lakes, charming villages, and outdoor adventures. Perfect for nature lovers and photography enthusiasts.",
    price: 1899,
    originalPrice: 2299,
    duration: "10 Days / 9 Nights",
    location: "Zurich, Lucerne, Interlaken, Zermatt",
    category: "international",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      "https://images.unsplash.com/photo-1527004760525-29c1fb3b3ea4?w=500",
      "https://images.unsplash.com/photo-1570122422252-2e87cedf7125?w=500",
    ],
    features: [
      "Scenic Train Journeys",
      "Matterhorn Views",
      "Lake Cruises",
      "Alpine Adventures",
      "Swiss Culture Immersion",
    ],
    inclusions: [
      "9 nights in premium hotels",
      "Daily breakfast",
      "Swiss Travel Pass",
      "All scenic train journeys",
      "Cable car rides",
      "Professional guide",
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner (except welcome dinner)",
      "Personal expenses",
      "Travel insurance",
      "Optional activities",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich",
        description:
          "Arrive at Zurich Airport. Transfer to hotel and check-in. Afternoon walking tour of Zurich's old town. Evening welcome dinner with traditional Swiss cuisine.",
      },
      {
        day: 2,
        title: "Zurich to Lucerne",
        description:
          "Morning train journey to Lucerne. Visit Chapel Bridge, Water Tower, and Lion Monument. Afternoon cruise on Lake Lucerne. Evening at leisure in charming old town.",
      },
      {
        day: 3,
        title: "Mount Titlis Excursion",
        description:
          "Full day excursion to Mount Titlis. Experience world's first revolving cable car. Visit Glacier Cave and Ice Flyer chairlift. Snow activities and panoramic views.",
      },
      {
        day: 4,
        title: "Lucerne to Interlaken",
        description:
          "Scenic train journey to Interlaken through beautiful countryside. Check into hotel. Afternoon visit to Harder Kulm for panoramic views of Eiger, Mönch, and Jungfrau.",
      },
      {
        day: 5,
        title: "Jungfraujoch - Top of Europe",
        description:
          "Full day excursion to Jungfraujoch, the 'Top of Europe'. Experience cogwheel train journey. Visit Ice Palace, Sphinx Observatory. Alpine sensation and glacier experience.",
      },
      {
        day: 6,
        title: "Adventure Activities",
        description:
          "Choose from paragliding, white water rafting, or canyon swinging. Afternoon visit to Trümmelbach Falls. Evening at leisure in Interlaken.",
      },
      {
        day: 7,
        title: "Interlaken to Zermatt",
        description:
          "Train journey to Zermatt, car-free alpine village. Check into hotel with Matterhorn views. Afternoon walking tour of village. Evening traditional Swiss dinner.",
      },
      {
        day: 8,
        title: "Matterhorn Experience",
        description:
          "Morning cable car to Matterhorn Glacier Paradise. Visit highest cable car station in Europe. Afternoon at Gornergrat for best Matterhorn views. Photography workshop.",
      },
      {
        day: 9,
        title: "Zermatt to Zurich",
        description:
          "Morning at leisure for last-minute shopping. Afternoon scenic train journey back to Zurich. Farewell dinner with Swiss entertainment.",
      },
      {
        day: 10,
        title: "Departure",
        description:
          "Transfer to Zurich Airport for departure. End of unforgettable Swiss Alps adventure.",
      },
    ],
    rating: 4.7,
    reviewCount: 198,
    maxGroupSize: 12,
    difficulty: "Moderate",
    bestTime: "June to September",
  },
  {
    id: "international-3",
    title: "Bali Island Paradise",
    description:
      "Discover the magic of Bali with its ancient temples, lush rice terraces, pristine beaches, and vibrant culture. Experience traditional ceremonies, spa treatments, and adventure activities in this tropical paradise.",
    price: 1299,
    originalPrice: 1599,
    duration: "7 Days / 6 Nights",
    location: "Ubud, Seminyak, Sanur, Bali",
    category: "international",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500",
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500",
    ],
    features: [
      "Temple & Cultural Tours",
      "Rice Terrace Trekking",
      "Beach Resort Stay",
      "Traditional Spa Treatments",
      "Balinese Cooking Class",
    ],
    inclusions: [
      "6 nights accommodation (mix of resort and boutique hotels)",
      "Daily breakfast",
      "Airport transfers",
      "Private air-conditioned vehicle",
      "English-speaking guide",
      "Temple entrance fees",
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner (except cooking class)",
      "Personal expenses",
      "Spa treatments",
      "Optional activities",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        description:
          "Arrive at Ngurah Rai Airport. Transfer to Ubud hotel and check-in. Evening at leisure to explore Ubud's art markets and cafes. Welcome dinner with traditional Balinese cuisine.",
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description:
          "Morning visit to Tegallalang Rice Terraces and coffee plantation. Afternoon tour of Sacred Monkey Forest and Ubud Palace. Evening traditional Kecak fire dance performance.",
      },
      {
        day: 3,
        title: "Temple Tour & Cooking Class",
        description:
          "Full day temple tour visiting Besakih Temple, Tirta Empul, and Gunung Kawi. Afternoon Balinese cooking class with local family. Evening at leisure.",
      },
      {
        day: 4,
        title: "Adventure & Transfer to Beach",
        description:
          "Morning white water rafting on Ayung River. Afternoon transfer to Seminyak beach resort. Evening sunset at famous Tanah Lot temple.",
      },
      {
        day: 5,
        title: "Beach Day & Water Sports",
        description:
          "Morning at leisure on Seminyak beach. Afternoon water sports activities including surfing lessons and snorkeling. Evening beachfront dinner and nightlife.",
      },
      {
        day: 6,
        title: "Spa & Cultural Shopping",
        description:
          "Morning traditional Balinese spa treatment. Afternoon shopping at local markets and art galleries. Visit to Uluwatu temple for sunset and Kecak dance.",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "Morning at leisure for last-minute shopping. Transfer to airport for departure. End of magical Bali experience.",
      },
    ],
    rating: 4.5,
    reviewCount: 267,
    maxGroupSize: 10,
    difficulty: "Easy",
    bestTime: "April to October",
  },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Package.deleteMany({});
    console.log("Cleared existing packages");

    // Insert sample data
    await Package.insertMany(samplePackages);
    console.log("Seeded database with sample packages");

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
