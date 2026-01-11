"use client";

import { useState } from "react";

interface DonateButtonProps {
  address: string;
}

export default function DonateButton({ address }: DonateButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-terminal-cyan hover:text-terminal-green transition-colors cursor-pointer"
    >
      {copied ? "Address copied!" : "Donate to me"}
    </button>
  );
}
