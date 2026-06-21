import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'maxcloud.id' },
      { protocol: 'https', hostname: 'cashplus.id' },
      { protocol: 'https', hostname: 'puas.id' },
      { protocol: 'https', hostname: 'metroreload.biz' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/logo-mark.png',
      },
      // Proxy API calls to backend
      {
        source: '/api/:path*',
        destination: 'http://sns_backend:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;