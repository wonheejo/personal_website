import Terminal from "@/components/Terminal";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Undefined",
  description: "All blog posts",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Terminal>
      <section>
        <h1 className="text-terminal-green text-xl mb-8">Blog</h1>

        {posts.length > 0 ? (
          <div className="space-y-1">
            <div className="text-terminal-gray text-sm mb-4 flex gap-4">
              <span className="w-24">Date</span>
              <span>Title</span>
            </div>
            <div className="border-t border-terminal-dim/30 pt-4">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  description={post.description}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-terminal-dim">
            No posts yet...
          </p>
        )}
      </section>
    </Terminal>
  );
}
