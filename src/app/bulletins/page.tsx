import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getAnnouncements } from "@/app/actions/announcements";

export default async function BulletinsPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) {
    redirect("/login");
  }

  // Get announcements for user's departments
  const announcements = await getAnnouncements(
    session.user.departments?.map((d) => d.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Department Bulletins</h1>

      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search announcements..."
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-lg shadow divide-y">
          {announcements.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No announcements available for your department
            </div>
          ) : (
            <div className="divide-y">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">
                      {announcement.title}
                    </h2>
                    <div className="text-sm text-gray-500">
                      <div>
                        {new Date(announcement.startDate).toLocaleDateString()}{" "}
                        -{" "}
                        {announcement.endDate
                          ? new Date(announcement.endDate).toLocaleDateString()
                          : "Ongoing"}
                      </div>
                      <div>
                        Posted by:{" "}
                        {announcement.author.name || announcement.author.email}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {announcement.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {announcement.departments.map((dept) => (
                      <span
                        key={dept.id}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
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
