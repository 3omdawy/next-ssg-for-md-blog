/**
 * Core types for the blog system
 */

export interface PostFrontmatter {
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  description?: string;
  image?: string;
  draft?: boolean;
  category?: string;
  language?: "ar" | "en" | string; // Language of the post content
  // New fields for series support
  series?: string; // Name of the series this post belongs to
  seriesOrder?: number; // Order within the series
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  mdxSource?: boolean; // Serialized MDX content (used as flag in this version)
  excerpt?: string;
  readingTime?: number;
  tableOfContents?: TableOfContentsItem[];
  // New fields for folder hierarchy
  series?: string; // Extracted from folder name if in a folder
  seriesSlug?: string; // URL-friendly version of series name
}

export interface PostMetadata {
  slug: string;
  frontmatter: PostFrontmatter;
  excerpt?: string;
  readingTime?: number;
  series?: string;
  seriesSlug?: string;
}

export interface Series {
  name: string; // Display name
  slug: string; // URL-friendly slug
  description?: string; // Optional series description
  posts: PostMetadata[]; // Posts in this series, sorted by order
}

export type BuildMode = "standalone" | "embeddable";

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
