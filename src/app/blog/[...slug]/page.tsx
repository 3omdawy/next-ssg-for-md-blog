import { notFound } from "next/navigation";
import config from "@/config";
import ArticleContent from "@/components/blog/ArticleContent";
import {
  getAllPostSlugs,
  getPostBySlug,
  getSeriesNavigation,
} from "@/lib/posts";
import { TableOfContents } from "@/components/blog/TableOfContents";
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
  const slugs = getAllPostSlugs();
  console.log('Generating static params for slugs:', slugs);
  
  return slugs.map((slug) => {
    const slugArray = slug.split("/");
    console.log(`Mapping slug "${slug}" to array:`, slugArray);
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
  console.log('Rendering blog post with slug:', slug);
  
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isEmbeddable = config.buildMode === "embeddable";

  // Get series navigation if post is part of a series
  const seriesNav = !isEmbeddable
    ? await getSeriesNavigation(slug)
    : { prev: null, next: null };

  // For embeddable mode, return just the content
  if (isEmbeddable) {
    return (
      <div className="article-wrapper">
        <ArticleContent content={post.content} />
      </div>
    );
  }

  // For standalone mode, return full page with metadata and TOC
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <article>
            {/* Post Header */}
            <header className="mb-8 border-b border-border pb-8">
              {/* Series Badge */}
              {post.series && post.seriesSlug && (
                <div className="mb-4">
                  <Link
                    prefetch={false}
                    href={`/series/${post.seriesSlug}`}
                    className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
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
                  <time
                    dateTime={post.frontmatter.date}
                    className="flex items-center gap-2"
                  >
                    <span className="sr-only">Published on</span>
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                )}

                {post.frontmatter.author && (
                  <span className="flex items-center gap-2">
                    <span className="sr-only">Written by</span>
                    {post.frontmatter.author}
                  </span>
                )}

                {post.readingTime && (
                  <span className="flex items-center gap-2">
                    {post.readingTime}
                  </span>
                )}
              </div>
            </header>

            {/* Post Content */}
            <ArticleContent content={post.content} />

            {/* Series Navigation */}
            {(seriesNav.prev || seriesNav.next) && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Series Navigation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seriesNav.prev ? (
                    <Link
                      prefetch={false}
                      href={`/blog/${seriesNav.prev.slug}`}
                      className="group border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="text-sm text-gray-500 mb-1">
                        ← Previous
                      </div>
                      <div className="font-semibold group-hover:text-primary transition-colors">
                        {seriesNav.prev.frontmatter.title}
                      </div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {seriesNav.next && (
                    <Link
                      prefetch={false}
                      href={`/blog/${seriesNav.next.slug}`}
                      className="group border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all text-right"
                    >
                      <div className="text-sm text-gray-500 mb-1">Next →</div>
                      <div className="font-semibold group-hover:text-primary transition-colors">
                        {seriesNav.next.frontmatter.title}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Post Footer / Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Tags
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
            )}
          </article>
        </div>

        {/* Sidebar / Table of Contents */}
        <aside className="hidden lg:block lg:col-span-1">
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <TableOfContents items={post.tableOfContents} />
          )}
        </aside>
      </div>
    </div>
  );
}
