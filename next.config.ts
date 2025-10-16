import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Turnstile site key - this will be available in the browser
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAAB3bEMvn_6FTfB4y",
  },
  images: {
    // Configure quality levels for Next.js Image optimization
    qualities: [75, 90, 95, 100],
    formats: ['image/webp', 'image/avif'],
  },
  /* other config options here */
};

export default nextConfig;
