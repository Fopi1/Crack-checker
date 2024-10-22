/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "f000.backblazeb2.com",
      },
    ],
  },
  // reactStrictMode: true,
};

export default nextConfig;
