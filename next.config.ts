import type { NextConfig } from "next";

const buildMode = process.env.BUILD_MODE || 'standalone';

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: 'export',
  
  // Disable trailing slashes for simpler static hosting
  // This generates /blog/post.html instead of /blog/post/index.html
  trailingSlash: false,
  
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
