import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/deslre/:path*",
        destination: "http://localhost:8080/deslre/:path*",
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
