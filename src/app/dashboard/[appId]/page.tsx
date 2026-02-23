"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import LogTable from "@/components/LogTable";
import AnalysisList from "@/components/AnalysisList";

type Tab = "logs" | "analyses";

interface Log {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  metadata: unknown;
  timestamp: string;
}

interface Analysis {
  id: string;
  summary: string;
  anomalies_detected: boolean;
  created_at: string;
}

export default function AppDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { appId } = useParams<{ appId: string }>();
  const [tab, setTab] = useState<Tab>("logs");
  const [logs, setLogs] = useState<Log[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [logsRes, analysesRes] = await Promise.all([
        fetch(`/api/logs/${appId}`),
        fetch(`/api/analyses/${appId}`),
      ]);

      if (logsRes.ok) {
        setLogs(await logsRes.json());
      }
      if (analysesRes.ok) {
        setAnalyses(await analysesRes.json());
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, [appId]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router, fetchData]);

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId }),
      });

      if (res.ok) {
        await fetchData();
        setTab("analyses");
      } else {
        const data = await res.json();
        alert(data.error || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          &larr; Back to apps
        </button>
        <button
          onClick={runAnalysis}
          disabled={analyzing}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? "Analyzing..." : "Run Analysis"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-zinc-900 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("logs")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "logs"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Logs
          <span className="ml-2 text-xs text-zinc-500">({logs.length})</span>
        </button>
        <button
          onClick={() => setTab("analyses")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "analyses"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Analyses
          <span className="ml-2 text-xs text-zinc-500">
            ({analyses.length})
          </span>
        </button>
      </div>

      {/* Tab content */}
      {tab === "logs" ? (
        <LogTable logs={logs} />
      ) : (
        <AnalysisList analyses={analyses} />
      )}
    </div>
  );
}
