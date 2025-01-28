import { getBlogPosts } from "app/blog/utils";
import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog."
};

export default function BlogPage() {
  const allBlogs = getBlogPosts();

  return (
    <section>
      <BlogPosts allBlogs={allBlogs} />
    </section>
  );
}
