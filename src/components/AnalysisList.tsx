"use client";

import { formatDistanceToNow } from "date-fns";

interface Analysis {
  id: string;
  summary: string;
  anomalies_detected: boolean;
  created_at: string;
}

export default function AnalysisList({ analyses }: { analyses: Analysis[] }) {
  if (analyses.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        No analyses yet. Click &quot;Run Analysis&quot; to analyze your logs
        with AI.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {analyses.map((analysis) => (
        <div
          key={analysis.id}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                analysis.anomalies_detected
                  ? "bg-red-400/10 text-red-400"
                  : "bg-emerald-400/10 text-emerald-400"
              }`}
            >
              {analysis.anomalies_detected
                ? "Anomaly Detected"
                : "All Clear"}
            </span>
            <span className="text-xs text-zinc-600">
              {formatDistanceToNow(new Date(analysis.created_at))} ago
            </span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {analysis.summary}
          </p>
        </div>
      ))}
    </div>
  );
}
