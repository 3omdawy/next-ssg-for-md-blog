"use client";

/**
 * Search Component
 * Client-side search using Fuse.js
 */

import React, { useState, useMemo } from "react";
import Link from "next/link";
import type { PostMetadata } from "@/types";
import { createSearchIndex } from "@/lib/search";

interface SearchProps {
  posts: PostMetadata[];
}

export function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fuse = useMemo(() => {
    return createSearchIndex(posts);
  }, [posts]);

  const results = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).map((result) => result.item);
  }, [fuse, query]);

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search posts..."
          className="w-full px-4 py-2 pl-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && query && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((post) => (
                  <Link
                    prefetch={false}
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block px-4 py-3 hover:bg-muted transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {post.frontmatter.title}
                    </h4>
                    {post.frontmatter.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {post.frontmatter.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No results found for &quot;{query}&quot;
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
