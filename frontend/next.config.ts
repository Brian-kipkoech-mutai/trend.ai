import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.trendai.app" },
      { protocol: "https", hostname: "cdn.dribbble.com" },
    ],
  },
};

export default nextConfig;
