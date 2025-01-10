import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getAnnouncements } from "@/app/actions/announcements";
import { Role } from "@prisma/client";

export default async function DashboardPage() {
  const announcements = await getAnnouncements();
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) {
    redirect("/login");
  }

  // Redirect viewers to their specific view
  if (session.user.role === Role.VIEWER) {
    redirect("/bulletins");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Management Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent p-4 rounded">
              <p className="text-muted-foreground">Active Announcements</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="bg-accent p-4 rounded">
              <p className="text-muted-foreground">Departments</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <a
              href="/dashboard/new"
              className="block w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition text-center"
            >
              Create New Announcement
            </a>
            <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-accent/90 transition">
              View All Announcements
            </button>
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="md:col-span-2 bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
          {announcements.length === 0 ? (
            <div className="bg-accent p-8 rounded text-center text-muted-foreground">
              No announcements yet
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border rounded-lg p-4 hover:bg-accent"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">
                      {announcement.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {announcement.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {announcement.departments.map((dept) => (
                      <span
                        key={dept.id}
                        className="px-2 py-1 bg-accent text-accent-foreground text-sm rounded"
                      >
                        {dept.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
