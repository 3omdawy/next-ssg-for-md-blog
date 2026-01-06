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
    author: 'Emad Ashraf',
  },
} as const;

export default config;
