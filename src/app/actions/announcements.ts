"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

interface CreateAnnouncementData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  departments: string[];
}

export async function createAnnouncement(data: CreateAnnouncementData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  if (
    session.user.role !== Role.CONTRIBUTOR &&
    session.user.role !== Role.ADMIN
  ) {
    throw new Error("Not authorized");
  }

  try {
    // Create the announcement
    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        authorId: session.user.id,
        departments: {
          connect: data.departments.map((id) => ({ id })),
        },
      },
    });

    return { success: true, announcement };
  } catch (error) {
    console.error("Failed to create announcement:", error);
    return { success: false, error: "Failed to create announcement" };
  }
}

export async function getAnnouncements(departmentIds?: string[]) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const announcements = await prisma.announcement.findMany({
      where:
        session.user.role === Role.ADMIN
          ? undefined // Admin sees all announcements
          : departmentIds
          ? {
              departments: {
                some: {
                  id: {
                    in: departmentIds,
                  },
                },
              },
            }
          : undefined,
      include: {
        departments: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return announcements;
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    throw new Error("Failed to fetch announcements");
  }
}
