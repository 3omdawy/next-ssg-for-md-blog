import { getAllTags, getPostsByTag } from "@/lib/posts";
import Link from "next/link";
import config from "@/config";

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}" | ${config.site.name}`,
    description: `Browse all articles tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  const decodedTag = decodeURIComponent(tag);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Posts tagged <span className="text-primary">#{decodedTag}</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Found {posts.length} article{posts.length === 1 ? "" : "s"}
        </p>
      </header>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border-b border-border pb-8 last:border-0"
          >
            <Link href={`/blog/${post.slug}`} className="group">
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
                {post.frontmatter.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${t}`}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      t === decodedTag
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
