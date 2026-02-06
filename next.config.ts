import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const baseConfig: NextConfig = {
  // Image optimization configuration
  images: {
    // Image qualities to support
    qualities: [75, 80],
    // Image formats to support
    formats: ["image/webp", "image/avif"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL (1 year)
    minimumCacheTTL: 31536000,
    // Remote patterns for flexible image sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // Enable experimental features
  experimental: {
    // optimizeCss: true, // Requires critters dependency which is missing
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  // Ensure Next.js uses this workspace as the tracing root, avoiding
  // confusion with other lockfiles higher up the directory tree.
  outputFileTracingRoot: process.cwd(),
  // Development origins (if configured)
  ...(process.env.NEXT_ALLOWED_DEV_ORIGINS && {
    allowedDevOrigins: process.env.NEXT_ALLOWED_DEV_ORIGINS.split(",").map(
      (origin) => origin.trim(),
    ),
  }),

};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(baseConfig);
