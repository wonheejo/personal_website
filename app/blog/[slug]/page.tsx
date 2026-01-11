import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Terminal from "@/components/Terminal";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Undefined`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Terminal>
      <article>
        <header className="mb-8">
          <Link
            href="/blog"
            className="text-terminal-dim hover:text-terminal-cyan transition-colors text-sm mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-terminal-green text-2xl mb-2">{post.title}</h1>
          <p className="text-terminal-gray text-sm">{post.date}</p>
        </header>

        <div className="prose text-terminal-green">
          <MDXRemote source={post.content} />
        </div>

        <footer className="mt-16 pt-8 border-t border-terminal-dim/30">
          <Link
            href="/blog"
            className="text-terminal-cyan hover:text-terminal-green transition-colors"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </Terminal>
  );
}
