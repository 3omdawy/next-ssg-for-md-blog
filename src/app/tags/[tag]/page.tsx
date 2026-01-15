/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAllTags, getPostsByTag } from "@/lib/posts";

import config from "@/config";
import { PostCard } from "@/components/blog/PostCard";

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
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
