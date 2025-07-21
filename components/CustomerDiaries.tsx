"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Instagram,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  customerName: string;
  location: string;
  hashtags: string[];
  likes: number;
  comments: number;
  date: string;
  permalink?: string;
}

export default function CustomerDiaries() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"instagram" | "fallback">(
    "fallback"
  );
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/instagram/posts");
      const data = await response.json();

      setInstagramPosts(data.posts);
      setDataSource(data.source);
    } catch (error) {
      console.error("Error fetching Instagram posts:", error);
      // Fallback to static data if API fails
      setInstagramPosts(getFallbackPosts());
      setDataSource("fallback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const getFallbackPosts = (): InstagramPost[] => [
    {
      id: "fallback_1",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption:
        "What an incredible journey through Kerala's backwaters! 🚢✨ Sarah and her family created memories that will last a lifetime. The houseboat experience, local cuisine, and warm hospitality made this trip absolutely magical!",
      customerName: "Sarah & Family",
      location: "Kerala Backwaters, India",
      hashtags: [
        "#UltimateTours",
        "#KeralaTourism",
        "#BackwatersExperience",
        "#FamilyTravel",
        "#India",
      ],
      likes: 324,
      comments: 28,
      date: "3 days ago",
    },
    {
      id: "fallback_2",
      image:
        "https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption:
        "Adventure awaits in the Golden Triangle! 🏰 Michael's solo journey through Delhi, Agra, and Jaipur was filled with amazing architecture, rich culture, and unforgettable experiences. From the Taj Mahal to local markets - every moment was perfect!",
      customerName: "Michael C.",
      location: "Golden Triangle, India",
      hashtags: [
        "#GoldenTriangle",
        "#TajMahal",
        "#UltimateTours",
        "#SoloTravel",
        "#IncredibleIndia",
      ],
      likes: 567,
      comments: 45,
      date: "1 week ago",
    },
    {
      id: "fallback_3",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption:
        "Beach bliss in Goa! 🏖️🌊 The Sharma family enjoyed 5 days of pure relaxation on pristine beaches. From water sports to sunset dinners, every detail was perfectly arranged. Thank you for trusting us with your dream vacation!",
      customerName: "The Sharma Family",
      location: "Goa, India",
      hashtags: [
        "#GoaTourism",
        "#BeachVacation",
        "#FamilyFun",
        "#UltimateTours",
        "#Paradise",
      ],
      likes: 892,
      comments: 67,
      date: "2 weeks ago",
    },
  ];

  if (loading) {
    return (
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Instagram className="h-8 w-8 text-pink-500 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">
                Customer Diaries
              </h2>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="h-5 w-5 animate-spin text-gray-500" />
              <p className="text-gray-600">
                Loading latest posts from Instagram...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="h-8 w-8 text-pink-500 mr-3" />
            <h2 className="text-4xl font-bold text-gray-800">
              Customer Diaries
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {dataSource === "instagram"
              ? "Latest stories from our travelers, live from our Instagram"
              : "Real stories from our travelers, shared on our Instagram"}
          </p>

          {/* Data source indicator */}
          <div className="flex items-center justify-center mb-4">
            {dataSource === "instagram" ? (
              <div className="flex items-center text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live from Instagram
              </div>
            ) : (
              <div className="flex items-center text-gray-500 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                Using sample data
              </div>
            )}
            <button
              onClick={fetchInstagramPosts}
              className="ml-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>

          <a
            href="https://instagram.com/_ultimate_tours_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            <Instagram className="h-5 w-5 mr-2" />
            Follow @_ultimate_tours_
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Post Header */}
              <div className="flex items-center p-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-gray-900">
                    _ultimate_tours_
                  </p>
                  <p className="text-sm text-gray-500">{post.location}</p>
                </div>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>

              {/* Post Image */}
              <div className="relative aspect-square">
                <img
                  src={post.image}
                  alt={`${post.customerName} travel experience`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  📸 {post.customerName}
                </div>
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center space-x-1 hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          likedPosts.includes(post.id)
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    <MessageCircle className="h-6 w-6 text-gray-600 hover:scale-110 transition-transform cursor-pointer" />
                    {post.permalink ? (
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Share className="h-6 w-6 text-gray-600 hover:scale-110 transition-transform" />
                      </a>
                    ) : (
                      <Share className="h-6 w-6 text-gray-600 hover:scale-110 transition-transform cursor-pointer" />
                    )}
                  </div>
                </div>

                {/* Likes and Comments */}
                <div className="mb-3">
                  <p className="font-semibold text-sm text-gray-900">
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes
                  </p>
                </div>

                {/* Caption */}
                <div className="mb-3">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">_ultimate_tours_</span>{" "}
                    {post.caption}
                  </p>
                </div>

                {/* Hashtags */}
                <div className="mb-3">
                  <p className="text-sm text-blue-600">
                    {Array.isArray(post.hashtags)
                      ? post.hashtags.join(" ")
                      : post.hashtags}
                  </p>
                </div>

                {/* Comments count */}
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  View all {post.comments} comments
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Share Your Travel Story!
            </h3>
            <p className="text-gray-600 mb-6">
              Tag us in your travel photos and use #UltimateTours to be featured
              in our customer diaries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/_ultimate_tours_"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Follow Us on Instagram
              </a>
              <a
                href="/contact"
                className="btn-outline inline-flex items-center"
              >
                Plan Your Trip
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
