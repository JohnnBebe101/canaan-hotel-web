import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXT_ALLOWED_DEV_ORIGINS && {
    allowedDevOrigins: process.env.NEXT_ALLOWED_DEV_ORIGINS.split(",").map((origin) => origin.trim()),
  }),
};

export default nextConfig;
