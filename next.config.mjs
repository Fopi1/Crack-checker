/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.gamestatus.info",
      },
      {
        protocol: "https",
        hostname: "f000.backblazeb2.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@reactuses/core"],
  },
  reactStrictMode: true,
};

export default nextConfig;
