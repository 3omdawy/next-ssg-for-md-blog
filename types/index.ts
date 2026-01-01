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
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  excerpt?: string;
  readingTime?: string;
  tableOfContents?: TableOfContentsItem[];
}

export interface PostMetadata {
  slug: string;
  frontmatter: PostFrontmatter;
  excerpt?: string;
  readingTime?: string;
}

export type BuildMode = 'standalone' | 'embeddable';

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
