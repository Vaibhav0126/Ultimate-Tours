const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ultimate-tours", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Comprehensive Domestic Packages
const domesticPackages = [
  {
    id: "domestic-1",
    title: "Darjeeling Gangtok Hills Escape",
    description:
      "Experience the majestic beauty of the Eastern Himalayas with breathtaking mountain views, tea gardens, monasteries, and rich cultural heritage of Sikkim and West Bengal.",
    price: 18500,
    originalPrice: 22000,
    duration: "6 Days / 5 Nights",
    location: "Darjeeling • Gangtok",
    category: "local",
    image: "https://images.unsplash.com/photo-1583222732505-b7d7c9c45cc1?w=800",
    images: [
      "https://images.unsplash.com/photo-1583222732505-b7d7c9c45cc1?w=800",
      "https://images.unsplash.com/photo-1543832923-44667a44c804?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    ],
    features: [
      "Tiger Hill Sunrise View",
      "Toy Train Experience",
      "Monastery Visits",
      "Tea Garden Tours",
      "Cable Car Rides",
      "Local Cultural Shows",
    ],
    inclusions: [
      "5 nights accommodation in 3-star hotels",
      "Daily breakfast and dinner",
      "Airport/Railway station transfers",
      "All sightseeing by private vehicle",
      "Professional English speaking guide",
      "Darjeeling Himalayan Railway joy ride",
      "All applicable taxes",
    ],
    exclusions: [
      "Lunch (available at nominal cost)",
      "Personal expenses and tips",
      "Camera fees at monuments",
      "Travel insurance",
      "Any meals not mentioned",
      "Ropeway and joy ride charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Darjeeling",
        description:
          "Arrive at Bagdogra Airport/New Jalpaiguri Railway Station. Drive to Darjeeling (3 hours). Check into hotel. Evening visit to Mall Road and Chowrasta. Overnight in Darjeeling.",
      },
      {
        day: 2,
        title: "Darjeeling Sightseeing",
        description:
          "Early morning visit to Tiger Hill for sunrise over Kanchenjunga. Visit Ghoom Monastery and Batasia Loop. Afternoon visit to Tea Garden, Himalayan Mountaineering Institute, Padmaja Naidu Zoological Park. Evening joy ride on Darjeeling Himalayan Railway.",
      },
      {
        day: 3,
        title: "Darjeeling to Gangtok",
        description:
          "Morning checkout and drive to Gangtok (4 hours). Check into hotel. Evening visit to MG Marg for shopping and local food. Overnight in Gangtok.",
      },
      {
        day: 4,
        title: "Gangtok Sightseeing",
        description:
          "Full day Gangtok sightseeing covering Enchey Monastery, Institute of Tibetology, Directorate of Handicrafts & Handloom, Flower Exhibition Centre. Afternoon visit to Tashi View Point and Ganesh Tok. Evening at leisure.",
      },
      {
        day: 5,
        title: "Tsomgo Lake & Baba Mandir",
        description:
          "Full day excursion to Tsomgo Lake (12,400 ft) and Baba Harbhajan Singh Mandir. Enjoy yak rides and snow activities (subject to weather). Return to Gangtok. Evening cultural show at hotel.",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Morning checkout and drive to Bagdogra Airport/NJP Railway Station (4 hours) for onward journey. Tour ends with beautiful memories.",
      },
    ],
    rating: 4.7,
    reviewCount: 234,
    maxGroupSize: 12,
    difficulty: "Moderate",
    bestTime: "March to May, September to November",
  },
  {
    id: "domestic-2",
    title: "Shillong Scotland of the East",
    description:
      "Discover the pristine beauty of Meghalaya with its rolling hills, crystal clear lakes, waterfalls, and unique living root bridges. Experience the rich Khasi culture and colonial charm of Shillong.",
    price: 16500,
    originalPrice: 19500,
    duration: "5 Days / 4 Nights",
    location: "Shillong • Cherrapunji",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Living Root Bridges",
      "Wettest Place on Earth",
      "Crystal Clear Lakes",
      "Magnificent Waterfalls",
      "Colonial Architecture",
      "Local Tribal Culture",
    ],
    inclusions: [
      "4 nights accommodation in 3-star hotels",
      "Daily breakfast and dinner",
      "Airport transfers",
      "All sightseeing by private vehicle",
      "Professional guide",
      "Boat ride at Umiam Lake",
      "All applicable taxes",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Camera fees",
      "Travel insurance",
      "Tips and gratuities",
      "Any airfare",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shillong",
        description:
          "Arrive at Guwahati Airport and drive to Shillong (3 hours). Check into hotel. Evening visit to Police Bazaar for shopping and local food tasting. Overnight in Shillong.",
      },
      {
        day: 2,
        title: "Shillong Local Sightseeing",
        description:
          "Visit Elephant Falls, Shillong Peak (highest point), Ward's Lake, Cathedral of Mary Help of Christians. Afternoon visit to Golf Course and Don Bosco Museum. Evening at leisure.",
      },
      {
        day: 3,
        title: "Cherrapunji Day Trip",
        description:
          "Full day excursion to Cherrapunji - the wettest place on earth. Visit Nohkalikai Falls, Seven Sisters Falls, Mawsmai Cave. Experience the famous Double Decker Living Root Bridge trek. Return to Shillong.",
      },
      {
        day: 4,
        title: "Umiam Lake & Local Culture",
        description:
          "Morning visit to Umiam Lake for boating and water sports. Afternoon visit to local villages to experience Khasi culture and traditional handicrafts. Evening cultural program with local folk dance.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning checkout and drive to Guwahati Airport (3 hours) for departure. En route visit to Basillica of Divine Mercy Church. Tour concludes.",
      },
    ],
    rating: 4.5,
    reviewCount: 187,
    maxGroupSize: 10,
    difficulty: "Moderate",
    bestTime: "October to May",
  },
  {
    id: "domestic-3",
    title: "Leh Ladakh Adventure Odyssey",
    description:
      "Journey to the Land of High Passes with stunning landscapes, ancient monasteries, high-altitude lakes, and adventure activities. Experience the unique Buddhist culture and breathtaking beauty of the Himalayas.",
    price: 32500,
    originalPrice: 38000,
    duration: "8 Days / 7 Nights",
    location: "Leh • Nubra Valley • Pangong Lake",
    category: "local",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "High Altitude Desert",
      "Ancient Monasteries",
      "Pangong Tso Lake",
      "Camel Safari in Nubra",
      "Khardung La Pass",
      "Buddhist Culture Immersion",
    ],
    inclusions: [
      "7 nights accommodation (hotels & camps)",
      "Daily breakfast and dinner",
      "Airport transfers",
      "All sightseeing by private vehicle",
      "Professional guide with oxygen support",
      "Inner line permits",
      "Camel safari in Nubra Valley",
    ],
    exclusions: [
      "Airfare to/from Leh",
      "Lunch and beverages",
      "Personal expenses",
      "Monument entrance fees",
      "Travel insurance",
      "Tips and porter charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh",
        description:
          "Arrive at Leh Airport. Transfer to hotel for acclimatization. Complete rest recommended. Evening visit to Leh Market and Shanti Stupa. Overnight in Leh.",
      },
      {
        day: 2,
        title: "Leh Local Sightseeing",
        description:
          "Visit Thiksey Monastery, Hemis Monastery, Shey Palace, and 3 Idiots School (Druk White Lotus School). Evening visit to Leh Palace and local market. Overnight in Leh.",
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La",
        description:
          "Early morning drive to Nubra Valley via Khardung La Pass (18,380 ft) - world's highest motorable road. Check into camps at Hunder. Evening camel safari on double-humped Bactrian camels.",
      },
      {
        day: 4,
        title: "Nubra Valley Exploration",
        description:
          "Visit Diskit Monastery and Giant Buddha statue. Explore sand dunes at Hunder. Visit Panamik Hot Springs. Overnight in Nubra Valley camps.",
      },
      {
        day: 5,
        title: "Nubra to Pangong Lake",
        description:
          "Drive to Pangong Lake (14,270 ft) via Shyok route. Check into camps at Pangong. Enjoy the changing colors of the lake. Photography session at sunset.",
      },
      {
        day: 6,
        title: "Pangong Lake to Leh",
        description:
          "Early morning at Pangong Lake for sunrise. Drive back to Leh via Chang La Pass (17,590 ft). En route visit Hemis Monastery if missed earlier. Overnight in Leh.",
      },
      {
        day: 7,
        title: "Magnetic Hill & Alchi",
        description:
          "Day trip to Magnetic Hill, Gurudwara Pathar Sahib, Sangam (confluence of Indus & Zanskar rivers), and Alchi Monastery. Evening leisure time for shopping.",
      },
      {
        day: 8,
        title: "Departure",
        description:
          "Transfer to Leh Airport for departure. End of memorable Ladakh adventure.",
      },
    ],
    rating: 4.8,
    reviewCount: 312,
    maxGroupSize: 8,
    difficulty: "Challenging",
    bestTime: "May to September",
  },
  {
    id: "domestic-4",
    title: "Kashmir Paradise on Earth",
    description:
      "Experience the unparalleled beauty of Kashmir with its snow-capped mountains, pristine valleys, beautiful gardens, and serene lakes. Enjoy shikara rides, golf, and the warm hospitality of Kashmir.",
    price: 28500,
    originalPrice: 32000,
    duration: "7 Days / 6 Nights",
    location: "Srinagar • Gulmarg • Pahalgam • Sonmarg",
    category: "local",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Houseboat Stay in Dal Lake",
      "Shikara Rides",
      "Gondola Cable Car",
      "Mughal Gardens",
      "Snow Activities",
      "Traditional Kashmiri Cuisine",
    ],
    inclusions: [
      "6 nights accommodation (houseboat & hotels)",
      "Daily breakfast and dinner",
      "Airport transfers",
      "All sightseeing by private vehicle",
      "Shikara rides in Dal Lake",
      "Professional guide",
      "Gondola ride in Gulmarg (Phase 1)",
    ],
    exclusions: [
      "Airfare to/from Srinagar",
      "Lunch and beverages",
      "Personal expenses",
      "Pony rides and snow activities",
      "Gondola Phase 2 charges",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar",
        description:
          "Arrive at Srinagar Airport. Transfer to houseboat on Dal Lake. Afternoon shikara ride to explore floating gardens and markets. Evening at leisure on houseboat.",
      },
      {
        day: 2,
        title: "Srinagar Sightseeing",
        description:
          "Visit Mughal Gardens - Nishat, Shalimar, and Chashme Shahi. Afternoon visit to Shankaracharya Temple and local handicraft centers. Evening shopping at Lal Chowk.",
      },
      {
        day: 3,
        title: "Srinagar to Gulmarg",
        description:
          "Drive to Gulmarg (2 hours) - the meadow of flowers. Check into hotel. Enjoy Gondola cable car ride (Phase 1). Experience snow activities (seasonal). Evening at leisure.",
      },
      {
        day: 4,
        title: "Gulmarg to Pahalgam",
        description:
          "Drive to Pahalgam (4 hours) - Valley of Shepherds. En route visit saffron fields and Avantipur ruins. Check into hotel. Evening walk along Lidder River.",
      },
      {
        day: 5,
        title: "Pahalgam Local Sightseeing",
        description:
          "Visit Betaab Valley, Chandanwari, and Aru Valley. Optional pony rides to beautiful meadows. Evening visit to local markets for shopping Kashmiri handicrafts.",
      },
      {
        day: 6,
        title: "Pahalgam to Sonmarg Day Trip",
        description:
          "Day excursion to Sonmarg - Meadow of Gold. Enjoy pony rides to Thajiwas Glacier (subject to weather). Experience snow activities. Return to Srinagar for overnight stay.",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "Morning visit to Hazratbal Shrine. Last-minute shopping for Kashmiri carpets, shawls, and dry fruits. Transfer to airport for departure.",
      },
    ],
    rating: 4.9,
    reviewCount: 428,
    maxGroupSize: 10,
    difficulty: "Easy",
    bestTime: "March to October",
  },
  {
    id: "domestic-5",
    title: "Royal Rajasthan - Udaipur Mount Abu",
    description:
      "Experience the royal heritage of Rajasthan with magnificent palaces, serene lakes, and the only hill station of Rajasthan. Discover the rich culture, architecture, and hospitality of the Desert State.",
    price: 22500,
    originalPrice: 26000,
    duration: "6 Days / 5 Nights",
    location: "Udaipur • Mount Abu",
    category: "local",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      "https://images.unsplash.com/photo-1588406623860-04a2c3cf8c4a?w=800",
    ],
    features: [
      "City of Lakes - Udaipur",
      "Magnificent Palaces",
      "Boat Rides in Lake Pichola",
      "Dilwara Jain Temples",
      "Sunset Point Views",
      "Royal Heritage Experience",
    ],
    inclusions: [
      "5 nights accommodation in heritage hotels",
      "Daily breakfast and dinner",
      "Airport/Railway transfers",
      "All sightseeing by private AC vehicle",
      "Boat ride in Lake Pichola",
      "Professional guide",
      "Cultural evening program",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Camera fees at monuments",
      "Travel insurance",
      "Tips and gratuities",
      "Any airfare or train fare",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Udaipur",
        description:
          "Arrive in Udaipur - the City of Lakes. Check into heritage hotel. Evening boat ride in Lake Pichola with views of City Palace and Jag Mandir. Overnight in Udaipur.",
      },
      {
        day: 2,
        title: "Udaipur City Tour",
        description:
          "Visit magnificent City Palace, Jagdish Temple, and Crystal Gallery. Afternoon visit to Saheliyon Ki Bari and Fateh Sagar Lake. Evening cultural show at Bagore Ki Haveli.",
      },
      {
        day: 3,
        title: "Udaipur Sightseeing",
        description:
          "Morning excursion to Eklingji and Nagda temples. Afternoon visit to Shilpgram Folk Museum. Evening sunset viewing from Monsoon Palace. Shopping at local markets.",
      },
      {
        day: 4,
        title: "Udaipur to Mount Abu",
        description:
          "Drive to Mount Abu (4 hours) - Rajasthan's only hill station. Check into hotel. Evening visit to Nakki Lake for boating and sunset viewing from Sunset Point.",
      },
      {
        day: 5,
        title: "Mount Abu Sightseeing",
        description:
          "Morning visit to famous Dilwara Jain Temples - architectural marvels. Afternoon visit to Guru Shikhar (highest peak), Achalgarh Fort, and Peace Park. Evening leisure walk at Mall Road.",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Morning checkout and drive to Udaipur Airport/Railway Station (4 hours) for departure. En route visit to Ranakpur Jain Temples (optional, extra charges). Tour ends.",
      },
    ],
    rating: 4.6,
    reviewCount: 298,
    maxGroupSize: 12,
    difficulty: "Easy",
    bestTime: "October to March",
  },
  {
    id: "domestic-6",
    title: "Desert Triangle - Jaisalmer Jodhpur Jaipur",
    description:
      "Explore the golden triangle of Rajasthan featuring the Golden City, Blue City, and Pink City. Experience desert safaris, magnificent forts, colorful bazaars, and royal heritage.",
    price: 25500,
    originalPrice: 29000,
    duration: "7 Days / 6 Nights",
    location: "Jaisalmer • Jodhpur • Jaipur",
    category: "local",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
    images: [
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1588406623860-04a2c3cf8c4a?w=800",
    ],
    features: [
      "Desert Safari with Camel Rides",
      "Magnificent Forts & Palaces",
      "Cultural Folk Performances",
      "Traditional Rajasthani Cuisine",
      "Colorful Local Markets",
      "Heritage Hotel Stays",
    ],
    inclusions: [
      "6 nights in heritage/4-star hotels",
      "Daily breakfast and dinner",
      "Airport/Railway transfers",
      "Private AC vehicle for all transfers",
      "Desert safari with camel ride",
      "Professional guide",
      "Cultural evening programs",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Monument entrance fees",
      "Travel insurance",
      "Tips and gratuities",
      "Any domestic flights",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaisalmer",
        description:
          "Arrive in Jaisalmer - the Golden City. Check into heritage hotel. Evening visit to Gadisar Lake and sunset viewing from Fort ramparts. Overnight in Jaisalmer.",
      },
      {
        day: 2,
        title: "Jaisalmer Fort & Havelis",
        description:
          "Morning visit to Jaisalmer Fort - living fort with people still residing. Explore Patwon Ki Haveli, Nathmal Ki Haveli, and Salim Singh Ki Haveli. Evening desert safari with camel ride and cultural program.",
      },
      {
        day: 3,
        title: "Jaisalmer to Jodhpur",
        description:
          "Drive to Jodhpur (5 hours) - the Blue City. Check into hotel. Evening visit to Clock Tower and Sardar Market for shopping. Overnight in Jodhpur.",
      },
      {
        day: 4,
        title: "Jodhpur Sightseeing",
        description:
          "Morning visit to magnificent Mehrangarh Fort and Jaswant Thada. Afternoon visit to Umaid Bhawan Palace Museum. Evening walk through blue painted old city streets.",
      },
      {
        day: 5,
        title: "Jodhpur to Jaipur",
        description:
          "Drive to Jaipur (5 hours) - the Pink City. En route visit to Pushkar (optional). Check into hotel. Evening visit to local bazaars for shopping. Overnight in Jaipur.",
      },
      {
        day: 6,
        title: "Jaipur Sightseeing",
        description:
          "Morning visit to Amber Fort with elephant/jeep ride. Afternoon city tour covering City Palace, Jantar Mantar, and Hawa Mahal. Evening cultural dinner with folk dance performance.",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "Morning visit to Birla Temple and Albert Hall Museum. Last-minute shopping at Johari Bazaar. Transfer to airport/railway station for departure.",
      },
    ],
    rating: 4.7,
    reviewCount: 356,
    maxGroupSize: 15,
    difficulty: "Easy",
    bestTime: "October to March",
  },
  {
    id: "domestic-7",
    title: "Classic Golden Triangle",
    description:
      "India's most famous tourist circuit covering the capital Delhi, the city of love Agra with the iconic Taj Mahal, and the royal city of Jaipur. Perfect introduction to India's rich heritage and culture.",
    price: 19500,
    originalPrice: 23000,
    duration: "6 Days / 5 Nights",
    location: "Delhi • Agra • Jaipur",
    category: "local",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      "https://images.unsplash.com/photo-1588406623860-04a2c3cf8c4a?w=800",
    ],
    features: [
      "UNESCO World Heritage Sites",
      "Taj Mahal Sunrise Visit",
      "Red Fort & India Gate",
      "Amber Palace Experience",
      "Professional Photography",
      "Cultural Immersion",
    ],
    inclusions: [
      "5 nights in 4-star hotels",
      "Daily breakfast and dinner",
      "Airport transfers",
      "Private AC vehicle with driver",
      "Professional English speaking guide",
      "All monument entrance fees",
      "Elephant/Jeep ride at Amber Fort",
    ],
    exclusions: [
      "Domestic/International flights",
      "Lunch and beverages",
      "Personal expenses",
      "Travel insurance",
      "Tips and gratuities",
      "Camera fees (if any)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description:
          "Arrive at Delhi Airport. Meet and greet by representative. Transfer to hotel. Evening visit to India Gate and President's House drive-by. Welcome dinner. Overnight in Delhi.",
      },
      {
        day: 2,
        title: "Delhi Sightseeing",
        description:
          "Full day Delhi tour covering Red Fort, Jama Masjid, Raj Ghat, Qutub Minar, Humayun's Tomb, and Lotus Temple. Experience rickshaw ride in Chandni Chowk. Overnight in Delhi.",
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description:
          "Morning drive to Agra (4 hours). Check into hotel. Afternoon visit to Agra Fort and Itmad-ud-Daula (Baby Taj). Evening sunset viewing of Taj Mahal from Mehtab Bagh. Overnight in Agra.",
      },
      {
        day: 4,
        title: "Taj Mahal & Drive to Jaipur",
        description:
          "Early morning visit to Taj Mahal at sunrise. Return to hotel for breakfast. Drive to Jaipur (5 hours) via Fatehpur Sikri. Check into hotel. Evening at leisure. Overnight in Jaipur.",
      },
      {
        day: 5,
        title: "Jaipur Sightseeing",
        description:
          "Morning excursion to Amber Fort with elephant/jeep ride. Afternoon city tour of Jaipur covering City Palace, Jantar Mantar, and Hawa Mahal. Evening shopping at local bazaars. Cultural dinner with folk performances.",
      },
      {
        day: 6,
        title: "Jaipur to Delhi Departure",
        description:
          "Morning visit to Birla Temple and local markets. Drive to Delhi (5 hours). Transfer to airport for departure or extend stay. Tour concludes with wonderful memories.",
      },
    ],
    rating: 4.8,
    reviewCount: 452,
    maxGroupSize: 20,
    difficulty: "Easy",
    bestTime: "October to March",
  },
  {
    id: "domestic-8",
    title: "Pune Khandala Weekend Getaway",
    description:
      "Perfect weekend escape to the scenic hill station of Khandala and exploring the cultural city of Pune. Enjoy pleasant weather, beautiful viewpoints, and historical attractions.",
    price: 8500,
    originalPrice: 10500,
    duration: "3 Days / 2 Nights",
    location: "Pune • Khandala",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Tiger's Leap Viewpoint",
      "Karla & Bhaja Caves",
      "Pleasant Hill Station Weather",
      "Historical Monuments",
      "Local Street Food",
      "Short & Sweet Trip",
    ],
    inclusions: [
      "2 nights accommodation in good hotels",
      "Daily breakfast",
      "All transfers by private vehicle",
      "Sightseeing as per itinerary",
      "Professional driver cum guide",
      "All applicable taxes",
    ],
    exclusions: [
      "Lunch and dinner",
      "Personal expenses",
      "Entry fees to monuments",
      "Travel insurance",
      "Any transportation to Pune",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Pune",
        description:
          "Arrive in Pune. Check into hotel. Afternoon sightseeing of Pune covering Shaniwar Wada, Sinhagad Fort, and Aga Khan Palace. Evening at FC Road for food and shopping. Overnight in Pune.",
      },
      {
        day: 2,
        title: "Pune to Khandala",
        description:
          "Morning drive to Khandala (2 hours). Check into hotel. Visit Tiger's Leap, Sunset Point, and Duke's Nose viewpoints. Evening at leisure enjoying the hill station ambiance. Overnight in Khandala.",
      },
      {
        day: 3,
        title: "Khandala Sightseeing & Departure",
        description:
          "Morning visit to ancient Karla and Bhaja Caves. Visit Rajmachi Point and Bhushi Dam. Afternoon return to Pune. Evening departure from Pune railway station/airport.",
      },
    ],
    rating: 4.3,
    reviewCount: 167,
    maxGroupSize: 8,
    difficulty: "Easy",
    bestTime: "June to February",
  },
  {
    id: "domestic-9",
    title: "Goa Beach Paradise",
    description:
      "Experience the tropical paradise of Goa with its pristine beaches, vibrant nightlife, Portuguese heritage, water sports, and delicious seafood. Perfect blend of relaxation and adventure.",
    price: 15500,
    originalPrice: 18000,
    duration: "5 Days / 4 Nights",
    location: "North Goa • South Goa",
    category: "local",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    features: [
      "Pristine Beaches",
      "Water Sports Activities",
      "Portuguese Heritage Sites",
      "Vibrant Nightlife",
      "Spice Plantation Tours",
      "Fresh Seafood Experience",
    ],
    inclusions: [
      "4 nights in beach resort/hotel",
      "Daily breakfast",
      "Airport transfers",
      "North & South Goa sightseeing",
      "Spice plantation tour with lunch",
      "Water sports activities",
      "River cruise with dinner",
    ],
    exclusions: [
      "Lunch and dinner (except mentioned)",
      "Personal expenses",
      "Alcoholic beverages",
      "Water sports (adventure level)",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Goa",
        description:
          "Arrive at Goa Airport. Transfer to beach resort. Check-in and relax. Evening visit to nearby beach for sunset. Welcome drink and overnight at resort.",
      },
      {
        day: 2,
        title: "North Goa Tour",
        description:
          "Full day North Goa tour covering Fort Aguada, Sinquerim Beach, Calangute Beach, Baga Beach, and Anjuna Beach. Evening shopping at flea markets. Overnight at resort.",
      },
      {
        day: 3,
        title: "Old Goa & Spice Plantation",
        description:
          "Morning tour of Old Goa visiting Basilica of Bom Jesus and Se Cathedral. Afternoon spice plantation tour with traditional Goan lunch. Evening at leisure on beach.",
      },
      {
        day: 4,
        title: "South Goa & Water Sports",
        description:
          "Morning South Goa tour covering Mormugao Port, Dona Paula, Miramar Beach, and Colva Beach. Afternoon water sports activities. Evening Mandovi River cruise with dinner and cultural show.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning at leisure for shopping or beach activities. Check out from hotel. Transfer to airport for departure with wonderful memories of Goa.",
      },
    ],
    rating: 4.5,
    reviewCount: 324,
    maxGroupSize: 16,
    difficulty: "Easy",
    bestTime: "November to February",
  },
  {
    id: "domestic-10",
    title: "Enchanting Kerala Backwaters",
    description:
      "Discover God's Own Country with its serene backwaters, lush hill stations, spice plantations, beaches, and rich cultural heritage. Experience traditional houseboats, Ayurveda, and authentic cuisine.",
    price: 24500,
    originalPrice: 28000,
    duration: "7 Days / 6 Nights",
    location: "Cochin • Munnar • Thekkady • Alleppey • Kovalam",
    category: "local",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    features: [
      "Houseboat Experience",
      "Tea Plantation Tours",
      "Spice Gardens Visit",
      "Ayurvedic Treatments",
      "Kathakali Performances",
      "Beach Resort Stay",
    ],
    inclusions: [
      "6 nights accommodation (hotels & houseboat)",
      "Daily breakfast and dinner",
      "Airport transfers",
      "All sightseeing by private vehicle",
      "Houseboat stay with all meals",
      "Kathakali show",
      "Spice plantation tour",
    ],
    exclusions: [
      "Lunch (except on houseboat)",
      "Personal expenses",
      "Ayurvedic treatments",
      "Camera fees",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cochin",
        description:
          "Arrive at Cochin Airport. Transfer to hotel. Afternoon sightseeing covering Chinese Fishing Nets, St. Francis Church, Dutch Palace, and Jew Street. Evening Kathakali dance performance.",
      },
      {
        day: 2,
        title: "Cochin to Munnar",
        description:
          "Drive to Munnar (4 hours) - Queen of Hill Stations. En route visit spice plantations and waterfalls. Check into hill resort. Evening at leisure enjoying cool climate.",
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        description:
          "Visit Tea Museum, Mattupetty Dam, Echo Point, and Kundala Lake. Afternoon visit to Eravikulam National Park (home to Nilgiri Tahr). Evening walk through tea gardens.",
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        description:
          "Drive to Thekkady (3 hours). Check into jungle resort. Afternoon boat cruise in Periyar Wildlife Sanctuary for wildlife spotting. Evening spice plantation tour with dinner.",
      },
      {
        day: 5,
        title: "Thekkady to Alleppey",
        description:
          "Drive to Alleppey (4 hours). Board traditional houseboat for backwater cruise. Lunch and dinner on houseboat. Overnight stay on houseboat experiencing local life.",
      },
      {
        day: 6,
        title: "Alleppey to Kovalam",
        description:
          "Disembark from houseboat after breakfast. Drive to Kovalam (2 hours). Check into beach resort. Evening at famous Lighthouse Beach. Ayurvedic massage session.",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "Morning at leisure on beach. Optional visit to Trivandrum for shopping. Transfer to Trivandrum Airport for departure. Tour concludes with beautiful memories.",
      },
    ],
    rating: 4.8,
    reviewCount: 398,
    maxGroupSize: 12,
    difficulty: "Easy",
    bestTime: "September to March",
  },
  {
    id: "domestic-11",
    title: "Tamil Nadu Temple Trail",
    description:
      "Explore the spiritual heritage of Tamil Nadu covering the southernmost tip of India, magnificent temples, and rich cultural traditions. Experience Dravidian architecture and Tamil culture.",
    price: 18500,
    originalPrice: 22000,
    duration: "6 Days / 5 Nights",
    location: "Kanyakumari • Madurai • Rameswaram",
    category: "local",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Tri-Sea Confluence",
      "Magnificent Temple Architecture",
      "Sunrise & Sunset Views",
      "Spiritual Experiences",
      "Cultural Heritage",
      "Traditional Tamil Cuisine",
    ],
    inclusions: [
      "5 nights accommodation in good hotels",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Professional guide",
      "Temple entrance fees",
      "Boat ride to Pamban Bridge",
      "Cultural programs",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Camera fees in temples",
      "Travel insurance",
      "Tips and gratuities",
      "Any domestic flights",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kanyakumari",
        description:
          "Arrive in Kanyakumari - the southernmost tip of India. Check into hotel. Evening visit to Sunset Point to witness spectacular sunset over Arabian Sea. Visit Vivekananda Rock Memorial.",
      },
      {
        day: 2,
        title: "Kanyakumari Sightseeing",
        description:
          "Early morning sunrise viewing. Visit Kanyakumari Temple, Gandhi Memorial, and Thiruvalluvar Statue. Afternoon visit to Suchindram Temple and Padmanabhapuram Palace.",
      },
      {
        day: 3,
        title: "Kanyakumari to Madurai",
        description:
          "Drive to Madurai (5 hours) - the cultural capital of Tamil Nadu. Check into hotel. Evening visit to famous Meenakshi Amman Temple for evening aarti ceremony.",
      },
      {
        day: 4,
        title: "Madurai Sightseeing",
        description:
          "Full day Madurai tour covering Meenakshi Temple, Thirumalai Nayak Palace, Gandhi Museum, and Alagar Kovil. Evening rickshaw ride through flower market and local bazaars.",
      },
      {
        day: 5,
        title: "Madurai to Rameswaram",
        description:
          "Drive to Rameswaram (3 hours) via Pamban Bridge. Check into hotel. Visit Ramanathaswamy Temple - one of the 12 Jyotirlingas. Evening visit to Dhanushkodi Beach.",
      },
      {
        day: 6,
        title: "Rameswaram & Departure",
        description:
          "Morning visit to Dr. APJ Abdul Kalam Memorial and house. Visit Five-faced Hanuman Temple. Afternoon drive to Madurai Airport/Railway Station (3 hours) for departure.",
      },
    ],
    rating: 4.4,
    reviewCount: 189,
    maxGroupSize: 15,
    difficulty: "Easy",
    bestTime: "October to March",
  },
  {
    id: "domestic-12",
    title: "Tamil Heritage - Pondicherry Chennai",
    description:
      "Experience the French colonial charm of Pondicherry and the vibrant metropolitan culture of Chennai along with ancient temple towns. Discover the diverse facets of Tamil Nadu.",
    price: 16500,
    originalPrice: 19000,
    duration: "5 Days / 4 Nights",
    location: "Pondicherry • Kanchipuram • Chennai",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "French Colonial Architecture",
      "Aurobindo Ashram",
      "Silk Weaving Centers",
      "Ancient Temples",
      "Beach Promenades",
      "Metropolitan Experience",
    ],
    inclusions: [
      "4 nights accommodation in good hotels",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Professional guide",
      "Sightseeing as per itinerary",
      "Boat house experience",
      "Cultural programs",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Entry fees to museums",
      "Travel insurance",
      "Shopping expenses",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Pondicherry",
        description:
          "Arrive in Pondicherry. Check into hotel. Afternoon city tour covering French Quarter, Aurobindo Ashram, and Pondicherry Museum. Evening stroll along Beach Promenade.",
      },
      {
        day: 2,
        title: "Pondicherry Exploration",
        description:
          "Morning visit to Auroville - international community. Afternoon visit to Paradise Beach and Chunnambar Boat House. Evening French cuisine experience and shopping at local markets.",
      },
      {
        day: 3,
        title: "Pondicherry to Chennai via Kanchipuram",
        description:
          "Drive to Chennai (4 hours) via Kanchipuram - City of Thousand Temples. Visit Kailasanathar Temple, Ekambaranathar Temple, and silk weaving centers. Continue to Chennai.",
      },
      {
        day: 4,
        title: "Chennai Sightseeing",
        description:
          "Full day Chennai tour covering Marina Beach, Fort St. George, Government Museum, Kapaleeshwarar Temple, and San Thome Cathedral. Evening cultural performance.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning visit to DakshinaChitra Museum. Last-minute shopping at Express Avenue Mall or T. Nagar. Transfer to Chennai Airport/Railway Station for departure.",
      },
    ],
    rating: 4.2,
    reviewCount: 156,
    maxGroupSize: 12,
    difficulty: "Easy",
    bestTime: "November to February",
  },
  {
    id: "domestic-13",
    title: "Odisha Golden Triangle",
    description:
      "Discover the rich heritage of Odisha with its magnificent temples, classical dance forms, beautiful beaches, and architectural marvels. Experience the land of Lord Jagannath.",
    price: 17500,
    originalPrice: 20500,
    duration: "5 Days / 4 Nights",
    location: "Bhubaneswar • Puri • Konark",
    category: "local",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    ],
    features: [
      "UNESCO World Heritage Sites",
      "Sun Temple Architecture",
      "Lord Jagannath Darshan",
      "Classical Odissi Dance",
      "Golden Beach",
      "Ancient Cave Temples",
    ],
    inclusions: [
      "4 nights accommodation in good hotels",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Professional guide",
      "All entrance fees",
      "Odissi dance performance",
      "Beach activities",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Camera fees in temples",
      "Travel insurance",
      "Tips and gratuities",
      "Any domestic transportation to Bhubaneswar",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bhubaneswar",
        description:
          "Arrive in Bhubaneswar - Temple City of India. Check into hotel. Afternoon visit to Lingaraj Temple, Mukteshwar Temple, and Rajarani Temple. Evening Odissi dance performance.",
      },
      {
        day: 2,
        title: "Bhubaneswar Sightseeing",
        description:
          "Morning visit to Udayagiri and Khandagiri Caves. Afternoon visit to State Museum, Tribal Museum, and local handicraft centers. Evening at leisure for shopping.",
      },
      {
        day: 3,
        title: "Bhubaneswar to Puri",
        description:
          "Drive to Puri (2 hours). Check into hotel near Golden Beach. Afternoon visit to famous Jagannath Temple for darshan. Evening at Golden Beach watching sunset.",
      },
      {
        day: 4,
        title: "Puri & Konark Excursion",
        description:
          "Morning visit to Konark Sun Temple - UNESCO World Heritage Site. Explore the magnificent architecture and sculptures. Return to Puri. Afternoon at leisure on beach. Evening local market visit.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning visit to Sudarshan Craft Museum and local artisan workshops. Drive back to Bhubaneswar (2 hours). Transfer to airport/railway station for departure.",
      },
    ],
    rating: 4.3,
    reviewCount: 142,
    maxGroupSize: 10,
    difficulty: "Easy",
    bestTime: "October to March",
  },
  {
    id: "domestic-14",
    title: "Tirupati Divine Journey",
    description:
      "Spiritual pilgrimage to one of India's most revered temples - Lord Venkateswara at Tirumala. Experience divine blessings, temple architecture, and spiritual atmosphere.",
    price: 12500,
    originalPrice: 15000,
    duration: "3 Days / 2 Nights",
    location: "Tirupati • Tirumala",
    category: "local",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Lord Venkateswara Darshan",
      "Seven Hills Sacred Journey",
      "TTD Guest House Stay",
      "Special Entry Darshan",
      "Spiritual Discourse",
      "Prasadam Experience",
    ],
    inclusions: [
      "2 nights accommodation (TTD guest house)",
      "Daily breakfast and dinner",
      "All transfers including Tirumala",
      "Special entry darshan tickets",
      "Guide for temple procedures",
      "Prasadam",
      "Tirumala ghat road travel",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Hair tonsuring charges",
      "Special services in temple",
      "Tips and donations",
      "Any transportation to Tirupati",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tirupati",
        description:
          "Arrive in Tirupati. Check into TTD guest house. Afternoon visit to Sri Venkateswara Temple for darshan. Evening visit to ISKCON temple and local market for shopping prasadam items.",
      },
      {
        day: 2,
        title: "Tirumala Darshan",
        description:
          "Early morning special entry darshan at Sri Venkateswara Temple. Experience the divine atmosphere and receive blessings. Afternoon visit to other temples on seven hills. Evening spiritual discourse.",
      },
      {
        day: 3,
        title: "Local Temples & Departure",
        description:
          "Morning visit to Padmavathi Temple at Tiruchanur and Kapila Theertham. Afternoon visit to local temples in Tirupati. Transfer to railway station/airport for departure.",
      },
    ],
    rating: 4.6,
    reviewCount: 287,
    maxGroupSize: 20,
    difficulty: "Easy",
    bestTime: "September to March",
  },
  {
    id: "domestic-15",
    title: "Garden City & Hill Stations",
    description:
      "Explore the Silicon Valley of India - Bangalore, the royal city of Mysore with its magnificent palace, and the scenic hill station of Ooty. Perfect combination of urban, heritage, and nature.",
    price: 19500,
    originalPrice: 23000,
    duration: "6 Days / 5 Nights",
    location: "Bangalore • Mysore • Ooty",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    features: [
      "Mysore Palace Illumination",
      "Nilgiri Mountain Railway",
      "Botanical Gardens",
      "Coffee Plantations",
      "Silicon Valley Experience",
      "Royal Heritage",
    ],
    inclusions: [
      "5 nights accommodation in good hotels",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Toy train ride in Ooty",
      "Professional guide",
      "Mysore Palace entry",
      "All sightseeing as per itinerary",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Entry fees (except mentioned)",
      "Travel insurance",
      "Tips and gratuities",
      "Any domestic flights",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangalore",
        description:
          "Arrive in Bangalore - Garden City of India. Check into hotel. Afternoon city tour covering Lalbagh Botanical Garden, Bull Temple, and Bangalore Palace. Evening at Brigade Road for shopping.",
      },
      {
        day: 2,
        title: "Bangalore to Mysore",
        description:
          "Drive to Mysore (3 hours). Check into hotel. Afternoon visit to magnificent Mysore Palace. Evening visit to Brindavan Gardens to witness musical fountain show.",
      },
      {
        day: 3,
        title: "Mysore Sightseeing",
        description:
          "Morning visit to Chamundi Hills and Chamundeshwari Temple. Afternoon visit to Mysore Zoo, St. Philomena's Church, and local silk weaving centers. Evening at Devaraja Market.",
      },
      {
        day: 4,
        title: "Mysore to Ooty",
        description:
          "Drive to Ooty (3 hours) - Queen of Hill Stations. En route visit Bandipur National Park (safari optional). Check into hill resort. Evening at leisure enjoying cool climate.",
      },
      {
        day: 5,
        title: "Ooty Sightseeing",
        description:
          "Morning toy train ride to Coonoor and back. Afternoon visit to Botanical Garden, Ooty Lake, and Doddabetta Peak (highest point in South India). Evening shopping at local market.",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Morning visit to Tea Factory and Museum. Drive to Bangalore (6 hours) or Coimbatore (3 hours) for departure. Tour concludes with beautiful memories.",
      },
    ],
    rating: 4.4,
    reviewCount: 198,
    maxGroupSize: 12,
    difficulty: "Easy",
    bestTime: "September to May",
  },
  {
    id: "domestic-16",
    title: "Tamil Nadu Hill Stations",
    description:
      "Experience the cool climate and scenic beauty of Tamil Nadu's popular hill stations. Enjoy pleasant weather, beautiful viewpoints, and nature's tranquility away from city life.",
    price: 17500,
    originalPrice: 20000,
    duration: "5 Days / 4 Nights",
    location: "Kodaikanal • Ooty • Coimbatore",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Princess of Hill Stations",
      "Star-shaped Lake",
      "Pine Forests",
      "Tea Gardens",
      "Pleasant Climate",
      "Nature Photography",
    ],
    inclusions: [
      "4 nights accommodation in hill resorts",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Boat rides in lakes",
      "Professional guide",
      "All sightseeing tours",
      "Nature walks",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Pony rides and horse riding",
      "Entry fees to private attractions",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kodaikanal",
        description:
          "Arrive in Kodaikanal - Princess of Hill Stations. Check into hill resort. Afternoon visit to famous star-shaped Kodai Lake for boating. Evening stroll in local market.",
      },
      {
        day: 2,
        title: "Kodaikanal Sightseeing",
        description:
          "Full day sightseeing covering Coaker's Walk, Bryant Park, Pillar Rocks, Green Valley View (Suicide Point), and Silver Cascade Falls. Evening bonfire at resort.",
      },
      {
        day: 3,
        title: "Kodaikanal to Ooty",
        description:
          "Drive to Ooty (4 hours) through scenic ghat roads. Check into hill resort. Evening visit to Ooty Lake and toy train station. Overnight in Ooty.",
      },
      {
        day: 4,
        title: "Ooty Sightseeing",
        description:
          "Morning visit to Botanical Garden and Rose Garden. Afternoon visit to Doddabetta Peak and Tea Factory. Evening shopping for tea, chocolates, and woolen items.",
      },
      {
        day: 5,
        title: "Ooty to Coimbatore Departure",
        description:
          "Morning checkout and drive to Coimbatore (3 hours). En route visit to Sim's Park in Coonoor. Transfer to Coimbatore Airport/Railway Station for departure.",
      },
    ],
    rating: 4.2,
    reviewCount: 143,
    maxGroupSize: 10,
    difficulty: "Easy",
    bestTime: "September to May",
  },
  {
    id: "domestic-17",
    title: "Nainital Jim Corbett Wildlife",
    description:
      "Perfect combination of hill station charm and wildlife adventure. Experience the beautiful lakes of Nainital and thrilling tiger safari in India's oldest national park.",
    price: 21500,
    originalPrice: 25000,
    duration: "6 Days / 5 Nights",
    location: "Nainital • Jim Corbett National Park",
    category: "local",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    features: [
      "Tiger Safari Experience",
      "Beautiful Lake Views",
      "Cable Car Rides",
      "Wildlife Photography",
      "Hill Station Activities",
      "Nature Walks",
    ],
    inclusions: [
      "5 nights accommodation (hill resort & jungle lodge)",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "2 jungle safaris in Corbett",
      "Cable car ride in Nainital",
      "Professional guide",
      "All applicable taxes",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Additional safari charges",
      "Elephant safari",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nainital",
        description:
          "Arrive in Nainital - Lake District of India. Check into hill resort. Afternoon boat ride in Naini Lake. Evening stroll on Mall Road and shopping. Overnight in Nainital.",
      },
      {
        day: 2,
        title: "Nainital Sightseeing",
        description:
          "Morning cable car ride to Snow View Point. Visit Naina Devi Temple, Governor's House, and Eco Cave Gardens. Afternoon visit to Sattal and Bhimtal lakes. Evening at leisure.",
      },
      {
        day: 3,
        title: "Nainital to Jim Corbett",
        description:
          "Drive to Jim Corbett National Park (2 hours). Check into jungle resort. Afternoon at leisure. Evening nature walk around resort. Overnight at jungle lodge.",
      },
      {
        day: 4,
        title: "Corbett Wildlife Safari",
        description:
          "Early morning jeep safari in Corbett National Park for tiger spotting and wildlife viewing. Afternoon at leisure or visit Corbett Museum. Evening jungle safari for bird watching.",
      },
      {
        day: 5,
        title: "Corbett to Nainital",
        description:
          "Morning elephant safari (optional) or river rafting in Kosi River. Drive back to Nainital. Afternoon visit to Tiffin Top and Land's End. Evening shopping for local handicrafts.",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Morning checkout and drive to Delhi (7 hours) or Kathgodam Railway Station (1 hour) for onward journey. Tour concludes with wonderful memories.",
      },
    ],
    rating: 4.5,
    reviewCount: 234,
    maxGroupSize: 8,
    difficulty: "Moderate",
    bestTime: "October to June",
  },
  {
    id: "domestic-18",
    title: "Kumaon Hills Spiritual Journey",
    description:
      "Explore the serene and spiritual side of Uttarakhand with panoramic Himalayan views, ancient temples, and peaceful hill stations. Experience the divine energy of Kumaon region.",
    price: 18500,
    originalPrice: 21500,
    duration: "5 Days / 4 Nights",
    location: "Kausani • Ranikhet • Almora",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Himalayan Sunrise Views",
      "Switzerland of India",
      "Ancient Temples",
      "Tea Gardens",
      "Pine Forests",
      "Cultural Heritage",
    ],
    inclusions: [
      "4 nights accommodation in hill resorts",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Professional guide",
      "All sightseeing tours",
      "Nature walks",
      "Cultural programs",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Entry fees to museums",
      "Travel insurance",
      "Tips and gratuities",
      "Any domestic transportation to hills",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kausani",
        description:
          "Arrive in Kausani - Switzerland of India. Check into hill resort with panoramic Himalayan views. Evening visit to Gandhi Ashram and Anasakti Yoga Ashram. Overnight in Kausani.",
      },
      {
        day: 2,
        title: "Kausani Himalayan Views",
        description:
          "Early morning sunrise viewing over Himalayan peaks including Nanda Devi, Trishul, and Panchachuli. Visit tea gardens and local village. Afternoon nature walks. Evening at leisure.",
      },
      {
        day: 3,
        title: "Kausani to Ranikhet",
        description:
          "Drive to Ranikhet (2 hours) - Queen's Meadow. Check into cantonment area hotel. Visit Jhula Devi Temple, Chaubatia Gardens, and Golf Course. Evening walk in pine forests.",
      },
      {
        day: 4,
        title: "Ranikhet to Almora",
        description:
          "Drive to Almora (2 hours) - cultural center of Kumaon. Visit Bright End Corner, Chitai Golu Devta Temple, and Kasar Devi Temple. Evening exploring local markets and handicrafts.",
      },
      {
        day: 5,
        title: "Almora Sightseeing & Departure",
        description:
          "Morning visit to Nanda Devi Temple and Govind Ballabh Pant Museum. Afternoon visit to Martola viewpoint. Drive to Kathgodam (3 hours) for railway connection or continue to Delhi.",
      },
    ],
    rating: 4.3,
    reviewCount: 167,
    maxGroupSize: 10,
    difficulty: "Easy",
    bestTime: "March to June, September to November",
  },
  {
    id: "domestic-19",
    title: "Himachal Hippie Trail",
    description:
      "Experience the bohemian culture of Himachal with its scenic valleys, hot springs, and peaceful villages. Perfect for nature lovers and those seeking tranquility in the mountains.",
    price: 16500,
    originalPrice: 19500,
    duration: "5 Days / 4 Nights",
    location: "Kasol • Manikaran • Manali",
    category: "local",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Parvati Valley Beauty",
      "Hot Water Springs",
      "Israeli Cafe Culture",
      "River Side Camping",
      "Himalayan Views",
      "Adventure Activities",
    ],
    inclusions: [
      "4 nights accommodation (hotels & camps)",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Professional guide",
      "River side camping",
      "Bonfire evenings",
      "All sightseeing tours",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Adventure activity charges",
      "Tips and gratuities",
      "Travel insurance",
      "Any domestic transportation to Himachal",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kasol",
        description:
          "Arrive in Kasol - Little Israel of India. Check into riverside accommodation. Afternoon walk along Parvati River. Evening exploring cafe culture and local markets. Overnight in Kasol.",
      },
      {
        day: 2,
        title: "Kasol to Manikaran",
        description:
          "Short drive to Manikaran Sahib - famous for hot water springs. Visit Gurudwara and take therapeutic bath in hot springs. Afternoon trek to nearby villages. Return to Kasol for overnight.",
      },
      {
        day: 3,
        title: "Kasol to Manali",
        description:
          "Drive to Manali (3 hours) through scenic Kullu Valley. Check into hotel. Afternoon visit to Hadimba Temple and local markets. Evening at leisure in Mall Road.",
      },
      {
        day: 4,
        title: "Manali Sightseeing",
        description:
          "Full day local sightseeing covering Solang Valley (adventure activities), Rohtang Pass (seasonal), and Vashisht hot springs. Evening shopping for local handicrafts and woolen items.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning visit to Manu Temple and Club House. Drive to Kullu for river rafting (optional) or direct to Chandigarh/Delhi for onward journey. Tour concludes.",
      },
    ],
    rating: 4.4,
    reviewCount: 189,
    maxGroupSize: 12,
    difficulty: "Moderate",
    bestTime: "March to June, September to November",
  },
  {
    id: "domestic-20",
    title: "Shimla Kufri Colonial Charm",
    description:
      "Experience the colonial charm of Shimla - former summer capital of British India, and enjoy the scenic beauty of Kufri. Perfect hill station getaway with toy train experience.",
    price: 14500,
    originalPrice: 17000,
    duration: "4 Days / 3 Nights",
    location: "Shimla • Kufri",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Toy Train Journey",
      "Colonial Architecture",
      "Mall Road Experience",
      "Scenic Mountain Views",
      "Snow Activities (seasonal)",
      "Horse Riding",
    ],
    inclusions: [
      "3 nights accommodation in good hotels",
      "Daily breakfast and dinner",
      "Toy train journey (Kalka to Shimla)",
      "All transfers by private vehicle",
      "Professional guide",
      "All sightseeing tours",
      "Horse riding in Kufri",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Cable car charges",
      "Snow activities charges",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla",
        description:
          "Arrive at Kalka and board famous toy train to Shimla (5 hours scenic journey). Check into hotel. Evening stroll on Mall Road and visit Christ Church. Overnight in Shimla.",
      },
      {
        day: 2,
        title: "Shimla Local Sightseeing",
        description:
          "Morning visit to Viceregal Lodge, Summer Hill, and Annandale. Afternoon visit to Jakhu Temple (Hanuman Temple) and State Museum. Evening shopping on Mall Road.",
      },
      {
        day: 3,
        title: "Kufri Day Trip",
        description:
          "Full day excursion to Kufri - winter sports capital. Enjoy horse riding, visit Himalayan Nature Park, and experience snow activities (seasonal). Evening return to Shimla.",
      },
      {
        day: 4,
        title: "Departure",
        description:
          "Morning checkout and drive to Chandigarh (4 hours) or take toy train to Kalka for onward journey. Tour concludes with beautiful hill station memories.",
      },
    ],
    rating: 4.1,
    reviewCount: 156,
    maxGroupSize: 15,
    difficulty: "Easy",
    bestTime: "March to June, September to December",
  },
  {
    id: "domestic-21",
    title: "Dharamshala McLeod Ganj Spiritual Retreat",
    description:
      "Experience the spiritual ambiance of Dharamshala - home of Dalai Lama, with its Tibetan culture, monasteries, and scenic beauty. Perfect for peace seekers and spiritual enthusiasts.",
    price: 17500,
    originalPrice: 20000,
    duration: "5 Days / 4 Nights",
    location: "Dharamshala • McLeod Ganj • Palampur",
    category: "local",
    image: "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
    images: [
      "https://images.unsplash.com/photo-1578470459023-62cb91b56e8d?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    features: [
      "Dalai Lama Temple",
      "Tibetan Culture Experience",
      "Monastery Visits",
      "Meditation Sessions",
      "Tea Gardens",
      "Himalayan Views",
    ],
    inclusions: [
      "4 nights accommodation in good hotels",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Professional guide",
      "Monastery visits",
      "Meditation session",
      "Tea garden tour",
    ],
    exclusions: [
      "Lunch and beverages",
      "Personal expenses",
      "Donation at monasteries",
      "Adventure activities",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dharamshala",
        description:
          "Arrive in Dharamshala. Drive to McLeod Ganj - Little Lhasa. Check into hotel. Afternoon visit to Dalai Lama Temple Complex and Tsuglagkhang. Evening walk in local market.",
      },
      {
        day: 2,
        title: "McLeod Ganj Spiritual Tour",
        description:
          "Morning meditation session at Tushita Meditation Centre. Visit Namgyal Monastery, Tibet Museum, and Tibetan Library. Afternoon visit to Bhagsu Nag Temple and waterfall.",
      },
      {
        day: 3,
        title: "Dharamkot & Triund Trek",
        description:
          "Morning visit to Dharamkot village. Optional trek to Triund (moderate difficulty) for panoramic Himalayan views. Afternoon visit to War Memorial and local handicraft centers.",
      },
      {
        day: 4,
        title: "Palampur Tea Gardens",
        description:
          "Day excursion to Palampur - tea capital of North India. Visit tea gardens and processing factories. Explore Baijnath Temple and Saurabh Van Vihar. Return to Dharamshala.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning visit to Norbulingka Institute - center for Tibetan arts. Last-minute shopping for Tibetan handicrafts. Drive to Pathankot Railway Station or continue to Delhi. Tour concludes.",
      },
    ],
    rating: 4.5,
    reviewCount: 223,
    maxGroupSize: 10,
    difficulty: "Moderate",
    bestTime: "March to June, September to December",
  },
];

async function seedDatabase() {
  try {
    // Clear existing domestic packages
    await Package.deleteMany({ category: "local" });
    console.log("Cleared existing domestic packages");

    // Insert new domestic packages
    await Package.insertMany(domesticPackages);
    console.log(
      `Seeded database with ${domesticPackages.length} domestic packages`
    );

    console.log("Domestic packages seeding completed successfully!");

    // Display summary
    console.log("\n=== SEEDED PACKAGES SUMMARY ===");
    domesticPackages.forEach((pkg, index) => {
      console.log(
        `${index + 1}. ${pkg.title} - ₹${pkg.price.toLocaleString("en-IN")} (${
          pkg.duration
        })`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
