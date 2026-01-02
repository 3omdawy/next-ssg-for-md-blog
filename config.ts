/**
 * Configuration for the blog
 * This file contains all configurable settings
 */

export const config = {
  // Build mode: 'standalone' or 'embeddable'
  buildMode: (process.env.BUILD_MODE || 'standalone') as 'standalone' | 'embeddable',
  
  // Site information
  site: {
    name: process.env.SITE_NAME || 'Tech Blog',
    description: process.env.SITE_DESCRIPTION || 'Technical articles and tutorials',
    url: process.env.SITE_URL || 'http://localhost:3000',
    author: 'Emad',
  },
  
  // Theme configuration (easily customizable)
  theme: {
    colors: {
      primary: process.env.THEME_PRIMARY_COLOR || '#3b82f6',
      accent: process.env.THEME_ACCENT_COLOR || '#8b5cf6',
    },
  },
  
  // Content configuration
  content: {
    postsPerPage: 10,
    excerptLength: 160,
  },
  
  // Features toggle
  features: {
    search: true,
    darkMode: true,
    relatedPosts: true,
    tableOfContents: true,
    readingTime: true,
  },
} as const;

export default config;
