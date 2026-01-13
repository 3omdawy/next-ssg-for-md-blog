/**
 * Configuration for the blog
 * This file contains all configurable settings
 */

export const config = {
  // Build mode: 'standalone' or 'embeddable'
  buildMode: (process.env.BUILD_MODE || "standalone") as "standalone" | "embeddable",

  // Site information
  site: {
    name: process.env.SITE_NAME || "Tech Blog",
    description: process.env.SITE_DESCRIPTION || "Technical articles and tutorials",
    url: process.env.SITE_URL || "http://localhost:3000",
    author: "Blog Author",
  },

  // Language and direction configuration
  // Options: 'ar' for Arabic (RTL), 'ltr' for explicit LTR, or 'default' for auto-detect per post
  language: (process.env.LANGUAGE || "default") as "ar" | "ltr" | "default",
} as const;

export default config;
