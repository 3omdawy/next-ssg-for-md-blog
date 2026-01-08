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
};

export default nextConfig;
