import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.trendai.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
