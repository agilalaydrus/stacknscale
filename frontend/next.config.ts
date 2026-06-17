import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/logo-mark.png',
      },
    ];
  },
};

export default nextConfig;