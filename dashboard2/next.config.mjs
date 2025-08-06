/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "localhost",
      "mobolap-dashboard.vercel.app",
      "mobolap-api.vercel.app",
    ],
  },
};

export default nextConfig;
