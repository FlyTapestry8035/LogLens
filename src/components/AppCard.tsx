"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface AppCardProps {
  app: {
    id: string;
    name: string;
    api_key: string;
    created_at: string;
  };
  logCount?: number;
  latestSummary?: string | null;
}

export default function AppCard({ app, logCount, latestSummary }: AppCardProps) {
  const [copied, setCopied] = useState(false);

  const copyApiKey = async () => {
    await navigator.clipboard.writeText(app.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link
      href={`/dashboard/${app.id}`}
      className="block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{app.name}</h3>
          <p className="text-sm text-zinc-500">
            Created {formatDistanceToNow(new Date(app.created_at))} ago
          </p>
        </div>
        {logCount !== undefined && (
          <span className="text-sm text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
            {logCount} logs
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs text-zinc-500 mb-1">API Key</p>
        <div className="flex items-center gap-2">
          <code className="text-sm text-emerald-400 bg-zinc-800 px-3 py-1.5 rounded font-mono flex-1 truncate">
            {app.api_key}
          </code>
          <button
            onClick={(e) => {
              e.preventDefault();
              copyApiKey();
            }}
            className="text-sm text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded transition-colors shrink-0"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {latestSummary && (
        <div className="border-t border-zinc-800 pt-4">
          <p className="text-xs text-zinc-500 mb-1">Latest Analysis</p>
          <p className="text-sm text-zinc-300 line-clamp-2">{latestSummary}</p>
        </div>
      )}
    </Link>
  );
}
