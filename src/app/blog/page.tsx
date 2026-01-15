/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAllPostsMetadata } from "@/lib/posts";

import config from "@/config";
import { Search } from "@/components/blog/Search";
import { PostCard } from "@/components/blog/PostCard";

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
          <PostCard key={post.slug} post={post} />
        ))}

        {posts.length === 0 && (
          <p className="text-secondary">No blog posts yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
