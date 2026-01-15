/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Post fetching and management utilities
 * Handles reading posts from the file system and providing metadata
 */

import fs from "fs";
import path from "path";
import {
  parseMarkdown,
  markdownToHtml,
  calculateReadingTime,
  generateExcerpt,
  extractTableOfContents,
  contentDirectory,
} from "./markdown";
import type { Post, PostMetadata, Series } from "../types";

/**
 * Normalize path to use forward slashes (for cross-platform compatibility)
 * Windows uses backslashes, but URLs always use forward slashes
 */
function normalizePath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

/**
 * Recursively get all markdown files from a directory
 */
function getMarkdownFilesRecursive(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      files.push(...getMarkdownFilesRecursive(fullPath, baseDir));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) &&
      entry.name.toLowerCase() !== "readme.md"
    ) {
      // Get relative path from base directory and normalize to forward slashes
      const relativePath = path.relative(baseDir, fullPath);
      files.push(normalizePath(relativePath));
    }
  }

  return files;
}

/**
 * Extract series information from file path
 * If file is in a subdirectory, use the directory name as series
 */
export function extractSeriesInfo(filePath: string): { series?: string; seriesSlug?: string } {
  // Always use forward slashes for splitting
  const normalizedPath = normalizePath(filePath);
  const parts = normalizedPath.split("/");

  // If the file is in a subdirectory (not at root level)
  if (parts.length > 1) {
    const seriesFolder = parts[0];
    // Convert folder name to human-readable format
    // e.g., "01-react-basics" -> "React Basics"
    const series = seriesFolder
      .replace(/^\d+-/, "") // Remove leading numbers
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      series,
      seriesSlug: seriesFolder,
    };
  }

  return {};
}

/**
 * Convert file path to slug
 * For nested files: folder/file.md -> folder/file
 * For root files: file.md -> file
 */
export function filePathToSlug(filePath: string): string {
  return filePath.replace(/\.mdx?$/, "");
}

/**
 * Get all post slugs from the content directory
 */
export function getAllPostSlugs(): string[] {
  const files = getMarkdownFilesRecursive(contentDirectory);
  return files.map(filePathToSlug);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Convert slug to file path (handle both forward slashes and URL-encoded backslashes)
    const normalizedSlug = slug.replace(/%5C/g, "/").replace(/\\/g, "/");

    // Convert forward slashes to platform-specific separators for file system access
    const fsPath = normalizedSlug.split("/").join(path.sep);

    // Try both .md and .mdx extensions
    const mdPath = path.join(contentDirectory, `${fsPath}.md`);
    const mdxPath = path.join(contentDirectory, `${fsPath}.mdx`);

    let filePath: string;
    if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, content } = parseMarkdown(fileContent);

    // Skip draft posts in production
    if (frontmatter.draft && process.env.NODE_ENV === "production") {
      return null;
    }

    const isMdx = filePath.endsWith(".mdx");
    let htmlContent = "";

    if (isMdx) {
      // For MDX, we'll render it using MDXRemote in the component
      // but we still generate HTML for excerpt/TOC utilities if needed
      htmlContent = await markdownToHtml(content);
    } else {
      htmlContent = await markdownToHtml(content);
    }
    const readingTime = calculateReadingTime(content);
    const excerpt = frontmatter.description || generateExcerpt(content);
    const tableOfContents = extractTableOfContents(content);

    // Extract series info from file path (relative to content directory)
    const relativePath = path.relative(contentDirectory, filePath);
    const normalizedRelativePath = normalizePath(relativePath);
    const seriesInfo = extractSeriesInfo(normalizedRelativePath);

    // Merge series info from folder with frontmatter (frontmatter takes precedence)
    const series = frontmatter.series || seriesInfo.series;
    const seriesSlug = seriesInfo.seriesSlug;

    return {
      slug: normalizedSlug, // Always use forward slashes in slug
      frontmatter: {
        ...frontmatter,
        series,
      },
      content: isMdx ? content : htmlContent, // Return raw content for MDX
      mdxSource: isMdx, // Use this as a flag for now, or just check extension
      excerpt,
      readingTime,
      tableOfContents,
      series,
      seriesSlug,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts with metadata (for listing pages)
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  // Filter out null posts and sort by date (newest first)
  return posts
    .filter((post): post is Post => post !== null && !!post.frontmatter.date)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();

      // Handle invalid dates
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return dateB - dateA;
    });
}

/**
 * Get posts metadata only (lighter weight for index pages)
 */
export async function getAllPostsMetadata(): Promise<PostMetadata[]> {
  const posts = await getAllPosts();
  return posts.map(({ slug, frontmatter, excerpt, readingTime, series, seriesSlug }) => ({
    slug,
    frontmatter,
    excerpt,
    readingTime,
    series,
    seriesSlug,
  }));
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.frontmatter.tags?.includes(tag));
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.frontmatter.category === category);
}

/**
 * Get posts by series
 */
export async function getPostsBySeries(seriesSlug: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const seriesPosts = allPosts.filter((post) => post.seriesSlug === seriesSlug);

  // Sort by seriesOrder if available, otherwise by date
  return seriesPosts.sort((a, b) => {
    if (a.frontmatter.seriesOrder !== undefined && b.frontmatter.seriesOrder !== undefined) {
      return a.frontmatter.seriesOrder - b.frontmatter.seriesOrder;
    }
    // Fall back to date sorting
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateA - dateB;
  });
}

/**
 * Get all series with their posts
 */
export async function getAllSeries(): Promise<Series[]> {
  const allPosts = await getAllPostsMetadata();
  const seriesMap = new Map<string, PostMetadata[]>();

  // Group posts by series
  allPosts.forEach((post) => {
    if (post.seriesSlug) {
      if (!seriesMap.has(post.seriesSlug)) {
        seriesMap.set(post.seriesSlug, []);
      }
      seriesMap.get(post.seriesSlug)!.push(post);
    }
  });

  // Convert to Series array
  const series: Series[] = [];
  seriesMap.forEach((posts, slug) => {
    // Sort posts by seriesOrder or date
    const sortedPosts = posts.sort((a, b) => {
      if (a.frontmatter.seriesOrder !== undefined && b.frontmatter.seriesOrder !== undefined) {
        return a.frontmatter.seriesOrder - b.frontmatter.seriesOrder;
      }
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateA - dateB;
    });

    series.push({
      name: posts[0].series || slug,
      slug,
      posts: sortedPosts,
    });
  });

  return series.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get all unique categories from all posts
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categoriesSet = new Set<string>();

  allPosts.forEach((post) => {
    if (post.frontmatter.category) {
      categoriesSet.add(post.frontmatter.category);
    }
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Get related posts based on tags
 */
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<Post[]> {
  const currentPost = await getPostBySlug(currentSlug);
  if (!currentPost || !currentPost.frontmatter.tags) {
    return [];
  }

  const allPosts = await getAllPosts();
  const currentTags = new Set(currentPost.frontmatter.tags);

  // Calculate similarity score based on shared tags
  const postsWithScores = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.frontmatter.tags?.filter((tag) => currentTags.has(tag)).length || 0;
      return { post, score: sharedTags };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScores.slice(0, limit).map(({ post }) => post);
}

/**
 * Get next and previous posts in a series
 */
export async function getSeriesNavigation(
  slug: string
): Promise<{ prev: PostMetadata | null; next: PostMetadata | null }> {
  const currentPost = await getPostBySlug(slug);

  if (!currentPost || !currentPost.seriesSlug) {
    return { prev: null, next: null };
  }

  const seriesPosts = await getPostsBySeries(currentPost.seriesSlug);
  const currentIndex = seriesPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev =
    currentIndex > 0
      ? {
          slug: seriesPosts[currentIndex - 1].slug,
          frontmatter: seriesPosts[currentIndex - 1].frontmatter,
          excerpt: seriesPosts[currentIndex - 1].excerpt,
          readingTime: seriesPosts[currentIndex - 1].readingTime,
          series: seriesPosts[currentIndex - 1].series,
          seriesSlug: seriesPosts[currentIndex - 1].seriesSlug,
        }
      : null;

  const next =
    currentIndex < seriesPosts.length - 1
      ? {
          slug: seriesPosts[currentIndex + 1].slug,
          frontmatter: seriesPosts[currentIndex + 1].frontmatter,
          excerpt: seriesPosts[currentIndex + 1].excerpt,
          readingTime: seriesPosts[currentIndex + 1].readingTime,
          series: seriesPosts[currentIndex + 1].series,
          seriesSlug: seriesPosts[currentIndex + 1].seriesSlug,
        }
      : null;

  return { prev, next };
}
