import { getAllPostsMetadata } from "@/lib/posts";
import Link from "next/link";
import config from "@/config";

export const metadata = {
  title: config.site.name,
  description: config.site.description,
};

export default async function Home() {
  const allPosts = await getAllPostsMetadata();
  const latestPosts = allPosts.slice(0, 5); // Show 5 latest posts

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-5xl font-bold mb-4">{config.site.name}</h1>
        <p className="text-xl text-secondary">{config.site.description}</p>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Link
            prefetch={false}
            href="/blog"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="space-y-8">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-custom pb-8 last:border-0"
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
                className="group"
              >
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </h3>
              </Link>

              <div className="flex flex-wrap gap-4 text-sm text-secondary mb-3">
                {post.frontmatter.date && (
                  <time dateTime={post.frontmatter.date}>
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

                {post.readingTime && <span>{post.readingTime}</span>}
              </div>

              {post.excerpt && (
                <p className="text-secondary mb-4">{post.excerpt}</p>
              )}

              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-surface hover:bg-surface-hover rounded-full transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}

          {latestPosts.length === 0 && (
            <p className="text-secondary">
              No blog posts yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
