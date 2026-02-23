"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import AppCard from "@/components/AppCard";
import CreateAppModal from "@/components/CreateAppModal";

interface App {
  id: string;
  name: string;
  api_key: string;
  created_at: string;
}

interface AppWithStats extends App {
  logCount?: number;
  latestSummary?: string | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apps, setApps] = useState<AppWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchApps = useCallback(async () => {
    try {
      const res = await fetch("/api/apps");
      if (res.ok) {
        const data = await res.json();
        setApps(data);
      }
    } catch (err) {
      console.error("Failed to fetch apps:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (status === "authenticated") {
      fetchApps();
    }
  }, [status, router, fetchApps]);

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Apps</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Monitor and analyze logs for all your applications.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
        >
          + New App
        </button>
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No apps yet
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            Create your first app to start monitoring logs.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            Create Your First App
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              logCount={app.logCount}
              latestSummary={app.latestSummary}
            />
          ))}
        </div>
      )}

      <CreateAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchApps}
      />
    </div>
  );
}
