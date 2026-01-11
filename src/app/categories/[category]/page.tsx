import { getAllCategories, getPostsByCategory } from "@/lib/posts";

import config from "@/config";
import { PostCard } from "@/components/blog/PostCard";

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
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
