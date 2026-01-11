import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: "export",

  // Disable trailing slashes for simpler static hosting
  // This generates /blog/post.html instead of /blog/post/index.html
  trailingSlash: false,

  // Configure images for static export
  images: {
    unoptimized: true, // Required for static export
  },
};

import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

export default bundleAnalyzer(nextConfig);
