import Link from "next/link";
import AsciiField from "@/components/AsciiField";

export const metadata = {
  title: "Web Designs | Undefined",
  description: "A collection of web design experiments",
};

export default function WebDesigns() {
  return (
    <div className="relative h-svh min-h-[560px] overflow-hidden">
      <AsciiField className="absolute inset-0 h-full w-full" />

      {/* Nav */}
      <header className="absolute inset-x-0 top-0 bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 text-sm">
          <Link
            href="/"
            style={{ color: "var(--foreground)" }}
            className="font-semibold tracking-[0.25em] no-underline hover:no-underline"
          >
            UNDEFINED
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/#posts"
              className="text-terminal-dim no-underline transition-colors hover:text-foreground hover:no-underline"
            >
              POSTS
            </Link>
            <span className="text-foreground">WEB DESIGNS</span>
            <Link
              href="/about"
              className="text-terminal-dim no-underline transition-colors hover:text-foreground hover:no-underline"
            >
              ABOUT
            </Link>
          </div>
        </nav>
      </header>

      {/* Piece caption */}
      <div className="absolute bottom-6 left-6 bg-background/80 px-4 py-3 backdrop-blur-sm">
        <p className="text-xs tracking-[0.3em] text-terminal-dim">001</p>
        <h1 className="mt-1 text-sm font-semibold tracking-wide">
          Glyph Drift
        </h1>
        <p className="mt-1 text-xs text-terminal-dim">
          generative ASCII noise field
        </p>
      </div>
    </div>
  );
}
