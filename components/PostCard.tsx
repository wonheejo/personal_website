import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export default function PostCard({ slug, title, date, description }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block hover:bg-terminal-selection/30 px-2 py-2 -mx-2 rounded transition-colors"
    >
      <div className="flex items-baseline gap-4">
        <span className="text-terminal-gray text-sm shrink-0">{date}</span>
        <span className="text-terminal-cyan group-hover:text-terminal-green transition-colors">
          {title}
        </span>
      </div>
      {description && (
        <p className="text-terminal-dim text-sm mt-1 ml-[4.5rem]">{description}</p>
      )}
    </Link>
  );
}
