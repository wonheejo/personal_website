import Link from "next/link";
import AsciiField from "@/components/AsciiField";
import DonateButton from "@/components/DonateButton";
import PostCard from "@/components/PostCard";
import ViewCounter from "@/components/ViewCounter";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="relative h-svh min-h-[560px] overflow-hidden">
        <AsciiField className="absolute inset-0 h-full w-full" />

        {/* Soft fade into the content below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

        {/* Nav */}
        <header className="absolute inset-x-0 top-0 bg-background/80 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 text-sm">
            <span className="font-semibold tracking-[0.25em] text-foreground">
              UNDEFINED
            </span>
            <div className="flex items-center gap-6">
              <a
                href="#posts"
                className="text-terminal-dim no-underline transition-colors hover:text-foreground hover:no-underline"
              >
                POSTS
              </a>
              <Link
                href="/web-designs"
                className="text-terminal-dim no-underline transition-colors hover:text-foreground hover:no-underline"
              >
                WEB DESIGNS
              </Link>
              <Link
                href="/about"
                className="text-terminal-dim no-underline transition-colors hover:text-foreground hover:no-underline"
              >
                ABOUT
              </Link>
            </div>
          </nav>
        </header>

        {/* Center title */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="rounded-full bg-background/70 px-10 py-8 backdrop-blur-[2px]">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Undefined
            </h1>
            <p className="mt-4 text-terminal-dim">
              Welcome to my corner of the internet.
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <a
          href="#posts"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-terminal-dim no-underline transition-colors hover:text-foreground hover:no-underline"
        >
          SCROLL ↓
        </a>
      </section>

      {/* Blog Posts */}
      <section id="posts" className="mx-auto max-w-3xl scroll-mt-8 px-4 py-16">
        <h2 className="mb-8 text-xs font-semibold tracking-[0.3em] text-terminal-dim">
          POSTS
        </h2>
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

        <footer className="mt-16 flex items-center justify-between border-t border-terminal-dim/30 pt-8 text-sm text-terminal-gray">
          <p>Thanks for visiting!</p>
          <DonateButton address="0x8c22e86fCfAEe1E1D32eBA1E8d6B2e204A6c2413" />
        </footer>
        <div className="pt-8 text-center">
          <ViewCounter />
        </div>
      </section>
    </>
  );
}
