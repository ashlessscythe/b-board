"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Role } from "@prisma/client";

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
          <nav className="hidden md:flex items-center gap-6 mx-6">
            {session?.user?.role === Role.ADMIN && (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/bulletins"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Bulletins
                </Link>
              </>
            )}
            {session?.user?.role === Role.CONTRIBUTOR && (
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
            )}
            {session?.user?.role === Role.VIEWER && (
              <Link
                href="/bulletins"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Bulletins
              </Link>
            )}
          </nav>
          <div>
            {status === "loading" ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {session.user?.name} ({session.user?.role?.toLowerCase()})
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sign in
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link
                  href="/signup"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
