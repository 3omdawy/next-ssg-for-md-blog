import { getAllPostsMetadata } from "@/lib/posts";
import Link from "next/link";
import config from "@/config";
import { PostCard } from "@/components/blog/PostCard";

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
            <PostCard key={post.slug} post={post} />
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
