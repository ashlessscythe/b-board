"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              B-Board
            </Link>
          </div>
          <div>
            {status === "loading" ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {session.user?.name} ({session.user?.role?.toLowerCase()})
                </span>
                <Link
                  href="/api/auth/signout"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sign out
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login?role=contributor"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contributor Login
                </Link>
                <Link
                  href="/login?role=viewer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Viewer Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
