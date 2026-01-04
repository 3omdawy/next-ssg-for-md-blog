import { notFound } from 'next/navigation';
import { getAllSeries, getPostsBySeries } from '@/lib/posts';
import Link from 'next/link';
import config from '@/config';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Disable dynamic params for static export
export const dynamicParams = false;

export async function generateStaticParams() {
  const allSeries = await getAllSeries();
  console.log('Generating static params for series:', allSeries.map(s => s.slug));
  
  return allSeries.map((series) => ({
    slug: series.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const allSeries = await getAllSeries();
  const series = allSeries.find((s) => s.slug === slug);

  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  return {
    title: `${series.name} | ${config.site.name}`,
    description: series.description || `All articles in the ${series.name} series`,
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allSeries = await getAllSeries();
  const series = allSeries.find((s) => s.slug === slug);

  if (!series) {
    notFound();
  }

  const posts = await getPostsBySeries(slug);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <nav className="mb-6">
        <Link
          href="/series"
          className="text-sm text-primary hover:underline"
        >
          ← Back to all series
        </Link>
      </nav>

      <h1 className="text-4xl font-bold mb-4">{series.name}</h1>
      
      {series.description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {series.description}
        </p>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-500 mb-8">
        {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this series
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h2>
                </Link>

                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  {post.frontmatter.date && (
                    <time dateTime={post.frontmatter.date}>
                      {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}

                  {post.readingTime && (
                    <span>{post.readingTime}</span>
                  )}

                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${tag}`}
                          className="text-primary hover:underline"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
