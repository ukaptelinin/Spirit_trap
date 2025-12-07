import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    };
    return config;
  },
};

export default nextConfig;
