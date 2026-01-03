import { getAllPostsMetadata } from "@/lib/posts";
import Link from "next/link";
import config from "@/config";
import { Search } from "@/components/blog/Search";

export const metadata = {
  title: `Blog | ${config.site.name}`,
  description: config.site.description,
};

export default async function BlogIndexPage() {
  const posts = await getAllPostsMetadata();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <Search posts={posts} />
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border-b border-border pb-8 last:border-0"
          >
            {/* Series Badge */}
            {post.series && post.seriesSlug && (
              <Link
                href={`/series/${post.seriesSlug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mb-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {post.series}
              </Link>
            )}

            <Link
              prefetch={false}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.frontmatter.title}
              </h2>
            </Link>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              {post.frontmatter.date && (
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}

              {post.readingTime && <span>{post.readingTime}</span>}
            </div>

            {post.excerpt && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
            )}

            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-muted text-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">
            No blog posts yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
