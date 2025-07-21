/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Image optimization settings
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "source.unsplash.com",
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Environment variables can be added here if needed
  // env: {
  //   CUSTOM_KEY: process.env.CUSTOM_KEY,
  // },

  // Redirects for SEO and user experience
  async redirects() {
    return [
      // Redirect old app router paths to new pages router paths if needed
      {
        source: "/app/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Webpack configuration for better optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Performance optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = "all";
    }

    return config;
  },
};

module.exports = nextConfig;
