import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getAnnouncements } from "@/app/actions/announcements";
import { getDepartments } from "@/app/actions/departments";
import { Department, Announcement } from "@prisma/client";
import BulletinsClient from "./bulletins-client";

interface AnnouncementWithRelations extends Announcement {
  author: {
    name: string | null;
    email: string | null;
  };
  departments: Department[];
}

export default async function BulletinsPage() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/login");
    }

    // Get initial data
    const deptResult = await getDepartments();
    const departments: Department[] =
      deptResult.success && deptResult.data ? deptResult.data : [];

    // Get initial announcements with proper null check
    const deptIds = session.user.departments?.map((d) => d.id) || [];
    const initialAnnouncements: AnnouncementWithRelations[] =
      await getAnnouncements(deptIds);

    return (
      <BulletinsClient
        session={session}
        initialAnnouncements={initialAnnouncements}
        initialDepartments={departments}
      />
    );
  } catch (error) {
    console.error("Failed to fetch initial data:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          Failed to load bulletins. Please try refreshing the page.
        </div>
      </div>
    );
  }
}
