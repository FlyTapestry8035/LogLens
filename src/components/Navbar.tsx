"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          <span className="text-emerald-400">Log</span>Lens
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="bg-white text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
