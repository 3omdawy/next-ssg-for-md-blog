import Fuse from "fuse.js";
import type { PostMetadata } from "../types";

export interface SearchOptions {
  keys?: string[];
  threshold?: number;
}

/**
 * Create a Fuse instance for searching posts
 */
export function createSearchIndex(posts: PostMetadata[], options: SearchOptions = {}) {
  return new Fuse(posts, {
    keys: options.keys || [
      "frontmatter.title",
      "frontmatter.description",
      "frontmatter.tags",
      "frontmatter.category",
    ],
    threshold: options.threshold || 0.3,
  });
}
