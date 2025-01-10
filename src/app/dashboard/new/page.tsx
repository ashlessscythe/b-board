import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import BackButton from "@/components/back-button";
import NewAnnouncementForm from "@/components/new-announcement-form";

export default async function NewAnnouncementPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) {
    redirect("/login");
  }

  // Redirect viewers to their specific view
  if (session.user.role === "VIEWER") {
    redirect("/bulletins");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create New Announcement</h1>
          <BackButton />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <NewAnnouncementForm />
        </div>
      </div>
    </div>
  );
}
