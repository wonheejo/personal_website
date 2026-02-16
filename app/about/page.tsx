import Terminal from "@/components/Terminal";
import CopyAddress from "@/components/CopyAddress";

export const metadata = {
  title: "About | Undefined",
  description: "About me and my links",
};

export default function AboutPage() {
  const links = [
    { name: "GitHub", url: "https://github.com/wonheejo", label: "github.com/wonheejo" },
    { name: "Twitter", url: "https://x.com/0xdawn_", label: "@0xdawn_" },
    { name: "Email", url: "wonheejo@gmail.com", label: "wonheejo@gmail.com" },
  ];

  return (
    <Terminal>
      <section className="mb-12">
        <h1 className="text-terminal-green text-xl mb-8">About</h1>

        <div className="space-y-6">
          <div className="text-terminal-green">
            <p className="mb-4">
              Hello! I'm Wonhee.
            </p>
            <p className="mb-4">
              I'm currently working as a Business Development for a blockchain company with ideas in mind for coding many things.
              This is my personal corner of the internet where I write about
              technology, ideas, hobbies, work, relations and things I find interesting.
            </p>
            <p>
              I like to go fishing and sort of like 'camping' but not the entire camping, not just at the moment.

            </p>
            <p>
              Feel free to reach out if you want to chat or collaborate on something.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-terminal-green text-lg mb-4">Links</h2>

        <div className="space-y-2">
          {links.map((link) => (
            <div key={link.name} className="flex items-center gap-4">
              <span className="text-terminal-gray w-20">{link.name}</span>
              <span className="text-terminal-dim">→</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-cyan hover:text-terminal-green transition-colors"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-terminal-green text-lg mb-4">Donations</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-terminal-gray w-20">Coffee</span>
            <span className="text-terminal-dim">→</span>
            <a
              href="https://buymeacoffee.com/endex_nova"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-cyan hover:text-terminal-green transition-colors"
            >
              Buy me a coffee
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-terminal-gray w-20">EVM</span>
            <span className="text-terminal-dim">→</span>
            <CopyAddress address="0x8c22e86fCfAEe1E1D32eBA1E8d6B2e204A6c2413" label="0x8c22e86fCfAEe1E1D32eBA1E8d6B2e204A6c2413" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-terminal-gray w-20">Solana</span>
            <span className="text-terminal-dim">→</span>
            <CopyAddress address="5uamjCjH5HVb9LmuCiGvEABFYXJ1XGDrwossP7MxM4L5" label="5uamjCjH5HVb9LmuCiGvEABFYXJ1XGDrwossP7MxM4L5" />
          </div>
        </div>
      </section>
    </Terminal>
  );
}
