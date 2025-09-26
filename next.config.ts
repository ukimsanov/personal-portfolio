import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Turnstile site key - this will be available in the browser
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAAB3bEMvn_6FTfB4y",
  },
  /* other config options here */
};

export default nextConfig;
