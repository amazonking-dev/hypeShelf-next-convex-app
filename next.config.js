/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Windows file system
  experimental: {
    optimizePackageImports: ["@clerk/nextjs"],
  },
};

module.exports = nextConfig;
