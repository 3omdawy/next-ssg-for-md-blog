/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
