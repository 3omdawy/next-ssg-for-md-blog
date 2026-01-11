import { describe, it, expect } from "vitest";
import { createSearchIndex } from "./search";
import type { PostMetadata } from "../types";

const mockPosts: PostMetadata[] = [
  {
    slug: "react-basics",
    frontmatter: {
      title: "React Basics",
      description: "Introduction to React",
      date: "2024-01-01",
      tags: ["react", "frontend"],
    },
    excerpt: "Intro to React",
    readingTime: 5,
  },
  {
    slug: "nextjs-ssg",
    frontmatter: {
      title: "Next.js SSG",
      description: "Static Site Generation with Next.js",
      date: "2024-01-02",
      tags: ["nextjs", "react", "ssg"],
      category: "Performance",
    },
    excerpt: "SSG Guide",
    readingTime: 7,
  },
];

describe("Search Utilities", () => {
  it("should return empty array for empty query", () => {
    const fuse = createSearchIndex(mockPosts);
    const results = fuse.search("").map((r) => r.item);
    expect(results).toEqual([]);
  });

  it("should find posts by title", () => {
    const fuse = createSearchIndex(mockPosts);
    const results = fuse.search("Basic").map((r) => r.item);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("react-basics");
  });

  it("should find posts by tags", () => {
    const fuse = createSearchIndex(mockPosts);
    const results = fuse.search("ssg").map((r) => r.item);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("nextjs-ssg");
  });

  it("should return multiple results for common terms", () => {
    const fuse = createSearchIndex(mockPosts);
    const results = fuse.search("react").map((r) => r.item);
    expect(results).toHaveLength(2);
  });

  it("should return empty array for no matches", () => {
    const fuse = createSearchIndex(mockPosts);
    const results = fuse.search("vue").map((r) => r.item);
    expect(results).toHaveLength(0);
  });
});
