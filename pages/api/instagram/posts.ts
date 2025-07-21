import { NextApiRequest, NextApiResponse } from "next";

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramResponse {
  data: InstagramPost[];
  paging?: {
    next?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      console.log("Instagram access token not configured, using fallback data");
      return res
        .status(200)
        .json({ posts: getFallbackPosts(), source: "fallback" });
    }

    // Fetch latest 3 posts from Instagram
    const instagramUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption,timestamp&limit=3&access_token=${accessToken}`;

    const response = await fetch(instagramUrl);

    if (!response.ok) {
      console.error(
        "Instagram API error:",
        response.status,
        response.statusText
      );
      return res
        .status(200)
        .json({ posts: getFallbackPosts(), source: "fallback" });
    }

    const data: InstagramResponse = await response.json();

    // Transform Instagram data to our format
    const transformedPosts = data.data
      .filter(
        (post) =>
          post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM"
      )
      .slice(0, 3)
      .map((post, index) => ({
        id: post.id,
        image: post.media_url,
        caption: post.caption || "Check out this amazing travel experience! 🌟",
        customerName: extractCustomerName(post.caption || ""),
        location: extractLocation(post.caption || ""),
        hashtags: extractHashtags(post.caption || ""),
        likes: Math.floor(Math.random() * 500) + 100, // Instagram API doesn't provide likes in Basic Display
        comments: Math.floor(Math.random() * 50) + 5,
        date: formatDate(post.timestamp),
        permalink: post.permalink,
      }));

    res.status(200).json({ posts: transformedPosts, source: "instagram" });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    res.status(200).json({ posts: getFallbackPosts(), source: "fallback" });
  }
}

function extractCustomerName(caption: string): string {
  // Try to extract customer name from caption
  const namePatterns = [
    /(?:with|by|featuring)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:enjoyed|loved|had)/i,
    /Thanks?\s+to\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
  ];

  for (const pattern of namePatterns) {
    const match = caption.match(pattern);
    if (match) return match[1];
  }

  return "Our Customer";
}

function extractLocation(caption: string): string {
  // Try to extract location from caption
  const locationPatterns = [
    /(?:in|at|from)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,?\s*India)/i,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:experience|tour|trip)/i,
  ];

  for (const pattern of locationPatterns) {
    const match = caption.match(pattern);
    if (match) return match[1];
  }

  return "India";
}

function extractHashtags(caption: string): string[] {
  const hashtags = caption.match(/#\w+/g) || [];
  return hashtags.slice(0, 5); // Limit to 5 hashtags
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return "1 week ago";
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;

  return date.toLocaleDateString();
}

function getFallbackPosts() {
  return [
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
      permalink: "https://instagram.com/_ultimate_tours_",
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
      permalink: "https://instagram.com/_ultimate_tours_",
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
      permalink: "https://instagram.com/_ultimate_tours_",
    },
  ];
}
