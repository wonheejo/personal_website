"use client";

import { useState } from "react";

interface CopyAddressProps {
  address: string;
  label?: string;
}

export default function CopyAddress({ address, label }: CopyAddressProps) {
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

  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <button
      onClick={handleCopy}
      className="text-terminal-cyan hover:text-terminal-green transition-colors cursor-pointer"
    >
      {copied ? "Copied!" : (label || truncatedAddress)}
    </button>
  );
}
