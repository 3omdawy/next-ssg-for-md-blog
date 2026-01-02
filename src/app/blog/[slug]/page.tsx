import { notFound } from "next/navigation";
import config from "@/config";
import ArticleContent from "@/components/blog/ArticleContent";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isEmbeddable = config.buildMode === "embeddable";

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
