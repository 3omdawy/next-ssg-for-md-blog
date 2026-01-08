/**
 * Markdown processing utilities
 * Handles parsing markdown files with frontmatter and converting to HTML
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import type { Post, PostFrontmatter } from '../types';

const contentDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Parse markdown content with frontmatter
 */
export function parseMarkdown(fileContent: string) {
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data as PostFrontmatter,
    content,
  };
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}

/**
 * Calculate reading time for content in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, length: number = 160): string {
  // Remove markdown syntax for excerpt
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .trim();

  if (plainText.length <= length) {
    return plainText;
  }

  return plainText.substring(0, length).trim() + '...';
}

/**
 * Extract table of contents from markdown
 */
export function extractTableOfContents(markdown: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  const slugCounts: Record<string, number> = {};
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    
    // Improved slugification for Unicode (Arabic, etc.)
    let slug = text
      .toLowerCase()
      .replace(/\s+/g, '-')                         // Replace spaces with -
      .replace(/[^\p{L}\p{N}-]+/gu, '')             // Remove non-word characters (preserving Unicode letters)
      .replace(/-+/g, '-')                          // Replace multiple - with single -
      .replace(/^-+|-+$/g, '');                     // Trim - from start and end

    // Fallback for strings that become empty after slugification
    if (!slug) slug = 'heading';

    // Handle duplicate IDs (match github-slugger behavior used by rehype-slug)
    let finalId = slug;
    if (slugCounts[slug] !== undefined) {
      slugCounts[slug]++;
      finalId = `${slug}-${slugCounts[slug]}`;
    } else {
      slugCounts[slug] = 0;
    }

    headings.push({ id: finalId, text, level });
  }

  return headings;
}

/**
 * Detects if text is primarily Arabic
 */
export function isArabicText(text: string): boolean {
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  
  // If more than 30% of non-whitespace characters are Arabic, consider it Arabic text
  return totalChars > 0 && (arabicChars / totalChars) > 0.3;
}

export { contentDirectory };
