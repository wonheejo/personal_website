import Link from "next/link";
import AsciiField from "@/components/AsciiField";
import E8Field from "@/components/E8Field";

export const metadata = {
  title: "Web Designs | Undefined",
  description: "A collection of web design experiments",
};

export default function WebDesigns() {
  return (
    <div>
      {/* Nav */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
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

      {/* 001 — Glyph Drift */}
      <section className="relative h-svh min-h-[560px] overflow-hidden">
        <AsciiField className="absolute inset-0 h-full w-full" />
        <div className="absolute bottom-6 left-6 bg-background/80 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs tracking-[0.3em] text-terminal-dim">001</p>
          <h1 className="mt-1 text-sm font-semibold tracking-wide">
            Glyph Drift
          </h1>
          <p className="mt-1 text-xs text-terminal-dim">
            generative ASCII noise field
          </p>
        </div>
      </section>

      {/* 002 — E8 */}
      <section className="relative h-svh min-h-[560px] overflow-hidden">
        <E8Field className="absolute inset-0 h-full w-full" />
        <div className="absolute bottom-6 left-6 bg-background/80 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs tracking-[0.3em] text-terminal-dim">002</p>
          <h2 className="mt-1 text-sm font-semibold tracking-wide">E8</h2>
          <p className="mt-1 text-xs text-terminal-dim">
            240 roots of the E8 lattice, tumbling through 8 dimensions
          </p>
          <p className="mt-1 text-xs text-terminal-dim">
            source:{" "}
            <a
              href="https://www.bittensor.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              bittensor.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
