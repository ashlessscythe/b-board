"use server";

import { prisma } from "@/lib/db";

export async function getDepartments() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return { success: true, data: departments };
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return {
      success: false,
      error: "Failed to fetch departments",
    };
  }
}
