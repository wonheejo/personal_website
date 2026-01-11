import Terminal from "@/components/Terminal";
import BlinkingCursor from "@/components/BlinkingCursor";
import DonateButton from "@/components/DonateButton";
import { getLatestPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const latestPosts = getLatestPosts(3);

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

      {/* Blog Preview Section */}
      <section className="mb-12">
        <div className="mb-4">
          <Link
            href="/blog"
            className="text-terminal-green text-lg hover:text-terminal-cyan transition-colors"
          >
            Blog
          </Link>
          <span className="text-terminal-dim ml-2">- Recent posts</span>
        </div>
        <div className="ml-4 border-l border-terminal-dim/30 pl-4">
          {latestPosts.length > 0 ? (
            <ul className="space-y-2">
              {latestPosts.map((post) => (
                <li key={post.slug} className="flex gap-4">
                  <span className="text-terminal-gray text-sm">{post.date}</span>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-terminal-cyan hover:text-terminal-green transition-colors"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-terminal-dim">No posts yet...</p>
          )}
        </div>
      </section>

      {/* About Preview Section */}
      <section className="mb-12">
        <div className="mb-4">
          <Link
            href="/about"
            className="text-terminal-green text-lg hover:text-terminal-cyan transition-colors"
          >
            About
          </Link>
          <span className="text-terminal-dim ml-2">- About me</span>
        </div>
        <div className="ml-4 border-l border-terminal-dim/30 pl-4">
          <p className="text-terminal-dim">
            A brief introduction and links to find me elsewhere on the web.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-terminal-gray text-sm border-t border-terminal-dim/30 pt-8 mt-16 flex justify-between items-center">
        <p>Thanks for visiting!</p>
        <DonateButton address="0x8c22e86fCfAEe1E1D32eBA1E8d6B2e204A6c2413" />
      </footer>
    </Terminal>
  );
}
