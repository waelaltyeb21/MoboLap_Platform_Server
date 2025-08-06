import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "development" ? "http" : "https",
        hostname:
          process.env.NODE_ENV === "development"
            ? "localhost"
            : process.env.NEXT_PUBLIC_SERVER_URL_PROD,
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
