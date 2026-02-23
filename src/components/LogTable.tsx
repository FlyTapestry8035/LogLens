"use client";

import { formatDistanceToNow } from "date-fns";

interface Log {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  metadata: unknown;
  timestamp: string;
}

const levelStyles: Record<string, string> = {
  info: "text-blue-400 bg-blue-400/10",
  warn: "text-yellow-400 bg-yellow-400/10",
  error: "text-red-400 bg-red-400/10",
};

export default function LogTable({ logs }: { logs: Log[] }) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        No logs yet. Send some logs using your API key.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm"
        >
          <div className="flex items-start gap-3">
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold uppercase shrink-0 ${
                levelStyles[log.level]
              }`}
            >
              {log.level}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-200 break-words">{log.message}</p>
              {log.metadata != null ? (
                <pre className="text-zinc-500 text-xs mt-2 overflow-x-auto">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>
              ) : null}
            </div>
            <span className="text-zinc-600 text-xs shrink-0">
              {formatDistanceToNow(new Date(log.timestamp))} ago
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
