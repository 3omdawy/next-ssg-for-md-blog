/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { notFound } from "next/navigation";
import config from "@/config";
import ArticleContent from "@/components/blog/ArticleContent";
import { getAllPostSlugs, getPostBySlug, getSeriesNavigation } from "@/lib/posts";
import { isArabicText } from "@/lib/markdown";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SeriesNavigation } from "@/components/blog/SeriesNavigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Disable dynamic params for static export
export const dynamicParams = false;

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Support single slug build for conversion script
  if (process.env.ONLY_BUILD_SLUG) {
    console.log(`Building only slug: ${process.env.ONLY_BUILD_SLUG}`);
    const slugArray = process.env.ONLY_BUILD_SLUG.split("/");
    return [
      {
        slug: slugArray,
      },
    ];
  }

  const slugs = getAllPostSlugs();

  return slugs.map((slug) => {
    const slugArray = slug.split("/");
    return {
      slug: slugArray, // Convert "folder/post" to ["folder", "post"]
    };
  });
}

// Generate metadata for each post
export async function generateMetadata({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.frontmatter.title} | ${config.site.name}`,
    description: post.frontmatter.description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isEmbeddable = config.buildMode === "embeddable";

  // Get series navigation if post is part of a series
  const seriesNav = await getSeriesNavigation(slug);

  // Determine direction based on frontmatter or content detection
  const shouldBeRTL =
    post.frontmatter.language === "ar" ||
    post.frontmatter.language === "arabic" ||
    isArabicText(post.content);

  // Shared content components to avoid duplication
  const postHeader = (
    <header className="mb-8 border-b border-border pb-8">
      {/* Series Badge */}
      {post.series && post.seriesSlug && (
        <div className="mb-4">
          <Link
            prefetch={false}
            href={`/series/${post.seriesSlug}`}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Part of: {post.series}
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {post.frontmatter.category && (
          <Link
            prefetch={false}
            href={`/categories/${post.frontmatter.category}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {post.frontmatter.category}
          </Link>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        {post.frontmatter.title}
      </h1>

      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
        {post.frontmatter.date && (
          <time dateTime={post.frontmatter.date} className="flex items-center gap-2">
            <span className="sr-only">Published on</span>
            {new Date(post.frontmatter.date).toLocaleDateString(shouldBeRTL ? "ar-EG" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        {post.frontmatter.author && (
          <span className="flex items-center gap-2">
            <span className="sr-only">Written by</span>
            {post.frontmatter.author}
          </span>
        )}

        {post.readingTime !== undefined && (
          <span className="flex items-center gap-2">
            {shouldBeRTL
              ? post.readingTime === 0
                ? "أقل من دقيقة للقراءة"
                : post.readingTime === 1
                  ? "دقيقة للقراءة"
                  : post.readingTime === 2
                    ? "دقيقتين للقراءة"
                    : `${post.readingTime} ${post.readingTime <= 10 ? "دقائق" : "دقيقة"} للقراءة`
              : `${post.readingTime} min read`}
          </span>
        )}
      </div>
    </header>
  );

  const postFooter = post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {shouldBeRTL ? "المواضيع" : "Tags"}
      </h3>
      <div className="flex flex-wrap gap-2">
        {post.frontmatter.tags.map((tag) => (
          <Link
            prefetch={false}
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-1 text-sm bg-muted text-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`${
        isEmbeddable ? "article-embed-wrapper" : "container mx-auto px-4 py-8 max-w-6xl"
      } ${shouldBeRTL ? "lang-ar" : ""}`}
      dir={shouldBeRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <article id="article-content-fragment">
            {postHeader}
            <ArticleContent content={post.content} mdxSource={post.mdxSource} />
            {!isEmbeddable && <SeriesNavigation seriesNav={seriesNav} shouldBeRTL={shouldBeRTL} />}
            {!isEmbeddable && postFooter}
          </article>
        </div>

        {/* Sidebar / Table of Contents */}
        <aside
          className={`hidden lg:block lg:col-span-1 sticky self-start ${
            isEmbeddable ? "top-4" : "top-24"
          }`}
        >
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div id="article-toc-fragment">
              <TableOfContents items={post.tableOfContents} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
