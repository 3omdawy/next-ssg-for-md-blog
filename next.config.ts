import type { NextConfig } from "next";

const buildMode = process.env.BUILD_MODE || 'standalone';

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: 'export',
  
  // Add trailing slashes for better static hosting compatibility
  trailingSlash: true,
  
  // Configure images for static export
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Conditional configuration based on build mode
  ...(buildMode === 'embeddable' && {
    basePath: '', // Can be configured if needed
    // Disable some features for embeddable mode
  }),
};

export default nextConfig;


