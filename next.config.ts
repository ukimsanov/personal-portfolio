import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for edge runtime
  output: 'standalone',
  // Use the new serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: [],
  // Reduce chunk splitting for better compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Reduce code splitting on server side
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
