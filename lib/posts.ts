/**
 * Post fetching and management utilities
 * Handles reading posts from the file system and providing metadata
 */

import fs from 'fs';
import path from 'path';
import {
  parseMarkdown,
  markdownToHtml,
  calculateReadingTime,
  generateExcerpt,
  extractTableOfContents,
  contentDirectory,
} from './markdown';
import type { Post, PostMetadata, PostFrontmatter } from '../types';

/**
 * Get all post slugs from the content directory
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const mdPath = path.join(contentDirectory, `${slug}.md`);
    const mdxPath = path.join(contentDirectory, `${slug}.mdx`);
    
    let filePath: string;
    if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = parseMarkdown(fileContent);

    // Skip draft posts in production
    if (frontmatter.draft && process.env.NODE_ENV === 'production') {
      return null;
    }

    const htmlContent = await markdownToHtml(content);
    const readingTime = calculateReadingTime(content);
    const excerpt = frontmatter.description || generateExcerpt(content);
    const tableOfContents = extractTableOfContents(content);

    return {
      slug,
      frontmatter,
      content: htmlContent,
      excerpt,
      readingTime,
      tableOfContents,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts with metadata (for listing pages)
 */
export async function getAllPosts(includeContent: boolean = false): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  );

  // Filter out null posts and sort by date (newest first)
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });
}

/**
 * Get posts metadata only (lighter weight for index pages)
 */
export async function getAllPostsMetadata(): Promise<PostMetadata[]> {
  const posts = await getAllPosts();
  return posts.map(({ slug, frontmatter, excerpt, readingTime }) => ({
    slug,
    frontmatter,
    excerpt,
    readingTime,
  }));
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.frontmatter.tags?.includes(tag)
  );
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.frontmatter.category === category
  );
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
export async function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): Promise<Post[]> {
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
      const sharedTags = post.frontmatter.tags?.filter((tag) =>
        currentTags.has(tag)
      ).length || 0;
      return { post, score: sharedTags };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScores.slice(0, limit).map(({ post }) => post);
}
