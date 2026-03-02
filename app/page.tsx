import Terminal from "@/components/Terminal";
import BlinkingCursor from "@/components/BlinkingCursor";
import DonateButton from "@/components/DonateButton";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <Terminal>
      {/* Welcome Section */}
      <section className="mb-12">
        <pre className="text-terminal-green text-sm mb-6">
          {`
 _   _           _       __ _                _
| | | |_ __   __| | ___ / _(_)_ __   ___  __| |
| | | | '_ \\ / _\` |/ _ \\ |_| | '_ \\ / _ \\/ _\` |
| |_| | | | | (_| |  __/  _| | | | |  __/ (_| |
 \\___/|_| |_|\\__,_|\\___|_| |_|_| |_|\\___|\\__,_|
`}
        </pre>
        <p className="text-terminal-dim mb-2">
          Welcome to my corner of the internet.
        </p>
        <p className="text-terminal-green">
          <BlinkingCursor />
        </p>
      </section>

      {/* Blog Posts */}
      <section className="mb-12">
        {posts.length > 0 ? (
          <div className="space-y-1">
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
        ) : (
          <p className="text-terminal-dim">No posts yet...</p>
        )}
      </section>

      {/* Footer */}
      <footer className="text-terminal-gray text-sm border-t border-terminal-dim/30 pt-8 mt-16 flex justify-between items-center">
        <p>Thanks for visiting!</p>
        <DonateButton address="0x8c22e86fCfAEe1E1D32eBA1E8d6B2e204A6c2413" />
      </footer>
    </Terminal>
  );
}
