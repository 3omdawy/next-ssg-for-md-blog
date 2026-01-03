import { getAllSeries } from "@/lib/posts";
import Link from "next/link";
import config from "@/config";

export const metadata = {
  title: `Series | ${config.site.name}`,
  description: "Browse all article series",
};

export default async function SeriesPage() {
  const allSeries = await getAllSeries();

  if (allSeries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Article Series</h1>
        <p className="text-gray-600 dark:text-gray-400">
          No series available yet. Series will appear here when you organize
          posts in folders.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Article Series</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        Browse all article series and sequential content collections.
      </p>

      <div className="space-y-8">
        {allSeries.map((series) => (
          <div
            key={series.slug}
            className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/series/${series.slug}`} prefetch={false}>
              <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                {series.name}
              </h2>
            </Link>

            {series.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {series.description}
              </p>
            )}

            <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              {series.posts.length}{" "}
              {series.posts.length === 1 ? "article" : "articles"}
            </div>

            <div className="space-y-2">
              {series.posts.slice(0, 3).map((post, index) => (
                <div key={post.slug} className="flex items-start gap-2">
                  <span className="text-gray-400 dark:text-gray-600 font-mono text-sm mt-0.5">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <Link
                    prefetch={false}
                    href={`/blog/${post.slug}`}
                    className="text-sm hover:text-primary transition-colors flex-1"
                  >
                    {post.frontmatter.title}
                  </Link>
                </div>
              ))}
              {series.posts.length > 3 && (
                <Link
                  prefetch={false}
                  href={`/series/${series.slug}`}
                  className="text-sm text-primary hover:underline inline-block ml-8"
                >
                  View all {series.posts.length} articles →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
