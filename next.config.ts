import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  images: {
    qualities: [75, 80, 90],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  poweredByHeader: false,
  compress: true,
  ...(process.env.NEXT_ALLOWED_DEV_ORIGINS && {
    allowedDevOrigins: process.env.NEXT_ALLOWED_DEV_ORIGINS.split(",").map(
      (origin) => origin.trim(),
    ),
  }),
};

const withAnalyzer = (config: NextConfig) => {
  if (process.env.ANALYZE === "true") {
    try {
      return require("@next/bundle-analyzer")({ enabled: true })(config);
    } catch (e) {
      console.warn("Bundle analyzer not found, proceeding without it.");
    }
  }
  return config;
};

export default withAnalyzer(baseConfig);
