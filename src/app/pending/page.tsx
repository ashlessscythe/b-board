"use client";

import { useSession, signOut } from "next-auth/react";

export default function PendingPage() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pb-20">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Account Pending Approval</h1>
          <p className="text-muted-foreground">
            Thank you for signing up! Your account is currently pending
            administrator approval.
          </p>
        </div>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Once your account is approved, you will be able to access the system
            with your assigned role.
          </p>
          <p>
            Please check back later or contact your department administrator if
            you have any questions.
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
