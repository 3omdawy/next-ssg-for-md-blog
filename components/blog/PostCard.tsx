"use client";

import React from "react";
import Link from "next/link";
import { PostMetadata } from "@/types";
import { isArabicText } from "@/lib/markdown";

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  const isArabic =
    post.frontmatter.language === "ar" ||
    post.frontmatter.language === "arabic" ||
    isArabicText(post.frontmatter.title);

  return (
    <article
      className={`border-b border-custom pb-8 last:border-0 ${
        isArabic ? "lang-ar text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Series Badge */}
      {post.series && post.seriesSlug && (
        <Link
          prefetch={false}
          href={`/series/${post.seriesSlug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors mb-2"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          {post.series}
        </Link>
      )}

      <Link
        prefetch={false}
        href={`/blog/${post.slug}`}
        className="group block"
      >
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-all duration-300">
          {post.frontmatter.title}
        </h3>
      </Link>

      <div
        className={`flex flex-wrap gap-4 text-sm text-secondary mb-3 ${
          isArabic ? "justify-start" : "justify-start"
        }`}
      >
        {post.frontmatter.date && (
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString(
              isArabic ? "ar-EG" : "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </time>
        )}

        {post.readingTime !== undefined && (
          <span>
            {isArabic
              ? post.readingTime === 0
                ? "أقل من دقيقة للقراءة"
                : post.readingTime === 1
                ? "دقيقة للقراءة"
                : post.readingTime === 2
                ? "دقيقتين للقراءة"
                : `${post.readingTime} ${
                    post.readingTime <= 10 ? "دقائق" : "دقيقة"
                  } للقراءة`
              : `${post.readingTime} min read`}
          </span>
        )}
      </div>

      {post.excerpt && (
        <p className="text-secondary mb-4 line-clamp-2">{post.excerpt}</p>
      )}

      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <Link
              prefetch={false}
              key={tag}
              href={`/tags/${tag}`}
              className="px-3 py-1 text-xs bg-surface hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
