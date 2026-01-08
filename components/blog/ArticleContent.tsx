"use client";

/**
 * ArticleContent Component
 * Renders markdown content with proper styling and RTL support
 */

import React, { useEffect, useRef } from "react";
import "highlight.js/styles/github-dark.css"; // Code highlighting theme

interface ArticleContentProps {
  content: string;
  className?: string;
  language?: string; // Optional language hint from frontmatter
}

/**
 * Detects if text is primarily Arabic
 */
function isArabicText(text: string): boolean {
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicRegex = /[\u0600-\u06FF]/;
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  
  // If more than 30% of non-whitespace characters are Arabic, consider it Arabic text
  return totalChars > 0 && (arabicChars / totalChars) > 0.3;
}

export function ArticleContent({
  content,
  className = "",
  language,
}: ArticleContentProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!articleRef.current) return;

    // Auto-detect direction if language is specified or detect from content
    const shouldBeRTL = language === 'ar' || language === 'arabic' || isArabicText(content);
    
    if (shouldBeRTL) {
      articleRef.current.setAttribute('dir', 'rtl');
      articleRef.current.classList.add('lang-ar');
    } else {
      articleRef.current.setAttribute('dir', 'ltr');
      articleRef.current.classList.remove('lang-ar');
    }
  }, [content, language]);

  return (
    <article
      ref={articleRef}
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default ArticleContent;
