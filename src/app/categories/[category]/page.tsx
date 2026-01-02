import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import Link from "next/link";
import config from "@/config";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return {
    title: `${decodedCategory} Posts | ${config.site.name}`,
    description: `Browse all articles in the ${decodedCategory} category`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = await getPostsByCategory(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Category: <span className="text-primary">{decodedCategory}</span>
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
                {post.frontmatter.tags.map((t) => (
                  <Link
                    prefetch={false}
                    key={t}
                    href={`/tags/${t}`}
                    className="px-2 py-1 text-xs bg-muted text-foreground rounded hover:bg-muted/80 transition-colors"
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
