"use client";

import { useState, useEffect } from "react";
import { getAnnouncements } from "@/app/actions/announcements";
import { Role, Department, Announcement } from "@prisma/client";
import { Session } from "next-auth";
import { formatDate } from "@/lib/utils/date";

interface AnnouncementWithRelations extends Announcement {
  author: {
    name: string | null;
    email: string | null;
  };
  departments: Department[];
}

interface BulletinsClientProps {
  session: Session;
  initialAnnouncements: AnnouncementWithRelations[];
  initialDepartments: Department[];
}

export default function BulletinsClient({
  session,
  initialAnnouncements,
  initialDepartments,
}: BulletinsClientProps) {
  const [announcements, setAnnouncements] =
    useState<AnnouncementWithRelations[]>(initialAnnouncements);
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);

  // Set initial selected departments after mount
  useEffect(() => {
    if (session?.user?.departments) {
      setSelectedDepts(session.user.departments.map((d) => d.id));
    }
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {session.user.role === Role.ADMIN
          ? "All Bulletins"
          : "Department Bulletins"}
      </h1>

      <div className="space-y-6">
        {/* Search and Filter */}
        <form
          className="bg-white p-4 rounded-lg shadow"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Department Filter */}
            <select
              aria-label="Filter by department"
              multiple
              value={selectedDepts}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setSelectedDepts(values);
                // Update announcements with filter
                getAnnouncements(values)
                  .then((announcements) =>
                    setAnnouncements(announcements || [])
                  )
                  .catch((error) => {
                    console.error("Failed to fetch announcements:", error);
                    setAnnouncements([]);
                  });
              }}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {initialDepartments.map((dept: Department) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search announcements..."
              aria-label="Search announcements"
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              aria-label="Filter by date"
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

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
                        {formatDate(announcement.startDate)} -{" "}
                        {formatDate(announcement.endDate)}
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
