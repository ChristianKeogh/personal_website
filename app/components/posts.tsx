"use client";
import { formatDate } from "app/blog/client-utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogPost {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
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
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </motion.div>
  );
}
