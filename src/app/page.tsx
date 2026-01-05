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
        <p className="text-xl text-secondary">
          {config.site.description}
        </p>
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
                <p className="text-secondary mb-4">
                  {post.excerpt}
                </p>
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
