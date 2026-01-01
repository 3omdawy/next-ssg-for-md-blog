"use client";

/**
 * ArticleContent Component
 * Renders markdown content with proper styling
 */

import React from "react";
import "highlight.js/styles/github-dark.css"; // Code highlighting theme

interface ArticleContentProps {
  content: string;
  className?: string;
}

export function ArticleContent({
  content,
  className = "",
}: ArticleContentProps) {
  return (
    <article
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default ArticleContent;
