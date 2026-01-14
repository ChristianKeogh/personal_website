"use client";
import { formatDate } from "app/blog/client-utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogPost {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
    summary: string;
  };
}

interface BlogPostsProps {
  allBlogs: BlogPost[];
}

export function BlogPosts({ allBlogs }: BlogPostsProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {allBlogs
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-8 group"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <div className="flex flex-row justify-between items-baseline">
                <p className="text-neutral-100 tracking-tight font-medium group-hover:text-neutral-300 transition-colors">
                  {post.metadata.title}
                </p>
                <p className="text-neutral-500 text-sm tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
              <p className="text-neutral-400 text-sm mt-1">
                {post.metadata.summary}
              </p>
            </div>
          </Link>
        ))}
    </motion.div>
  );
}
