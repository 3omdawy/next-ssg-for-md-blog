/**
 * ArticleContent Component
 * Renders markdown content with proper styling and RTL support
 */

import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/github-dark.css"; // Code highlighting theme

interface ArticleContentProps {
  content: string;
  mdxSource?: boolean; // Used as isMdx flag in this version
  className?: string;
  language?: string; // Optional language hint from frontmatter
}

/**
 * Detects if text is primarily Arabic
 */
function isArabicText(text: string): boolean {
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const totalChars = text.replace(/\s/g, "").length;

  // If more than 30% of non-whitespace characters are Arabic, consider it Arabic text
  return totalChars > 0 && arabicChars / totalChars > 0.3;
}

// Define custom components for MDX
const components = {
  // You can add custom components here
  // MyComponent: () => <div className="p-4 bg-primary text-white rounded-lg">Hello from Component!</div>,
};

export async function ArticleContent({
  content,
  mdxSource,
  className = "",
  language,
}: ArticleContentProps) {
  // Auto-detect direction if language is specified or detect from content
  const shouldBeRTL = language === "ar" || language === "arabic" || isArabicText(content || "");

  return (
    <article
      dir={shouldBeRTL ? "rtl" : "ltr"}
      className={`prose prose-lg dark:prose-invert max-w-none ${
        shouldBeRTL ? "lang-ar" : ""
      } ${className}`}
    >
      {mdxSource ? (
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeHighlight,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </article>
  );
}

export default ArticleContent;
