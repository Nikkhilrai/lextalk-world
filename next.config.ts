import type { NextConfig } from "next";

const nextConfig: any = {
  async redirects() {
    return [
      { source: "/blog", destination: "/blog-news", permanent: true },
      { source: "/blog/:slug", destination: "/blog-news/:slug", permanent: true },
      // Bangalore 2026 concluded on June 11, 2026 — no more passes to sell.
      { source: "/bangalore-awardee-confirmation-2026", destination: "/awardees-bangalore-2026", permanent: false },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "lextalk.world",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
