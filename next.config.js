/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.56.1"],
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
