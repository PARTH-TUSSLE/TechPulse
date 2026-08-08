"use client";

import { useState } from "react";

export default function ExpandableText({
  text,
  className = "",
  lines = 3,
}: {
  text: string;
  className?: string;
  lines?: 2 | 3 | 4;
}) {
  const [expanded, setExpanded] = useState(false);

  const clampClass =
    lines === 2 ? "line-clamp-2" : lines === 4 ? "line-clamp-4" : "line-clamp-3";

  return (
    <div>
      <p className={`${className} ${expanded ? "" : `${clampClass} md:line-clamp-none`}`}>
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-2 inline-flex items-center gap-1.5 rounded border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-signal transition-colors hover:bg-signal/10 md:hidden"
      >
        {expanded ? "Less" : "More"}
        <span aria-hidden>{expanded ? "↑" : "↓"}</span>
      </button>
    </div>
  );
}