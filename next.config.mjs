/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.gamestatus.info",
      },
      {
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
