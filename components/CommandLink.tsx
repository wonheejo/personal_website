import Link from "next/link";

interface CommandLinkProps {
  href: string;
  command: string;
  children?: React.ReactNode;
}

export default function CommandLink({ href, command, children }: CommandLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-2 hover:bg-terminal-selection/30 px-2 py-1 -mx-2 rounded transition-colors"
    >
      <span className="text-terminal-dim group-hover:text-terminal-green transition-colors">&gt;</span>
      <span className="text-terminal-cyan group-hover:text-terminal-green transition-colors">
        {command}
      </span>
      {children && (
        <span className="text-terminal-gray">{children}</span>
      )}
    </Link>
  );
}
