"use client";

import { useEffect, useState } from "react";

interface ViewCounts {
  total: number;
  today: number;
}

export default function ViewCounter() {
  const [counts, setCounts] = useState<ViewCounts | null>(null);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const res = await fetch("/api/views", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setCounts(data);
        }
      } catch (error) {
        console.error("Failed to increment views:", error);
      }
    };

    incrementViews();
  }, []);

  if (!counts) {
    return (
      <span className="text-terminal-gray text-sm">
        Loading views...
      </span>
    );
  }

  return (
    <span className="text-terminal-gray text-sm">
      Total views: {counts.total} | Today: {counts.today}
    </span>
  );
}
