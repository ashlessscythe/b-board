import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is a CONTRIBUTOR
    if (!session?.user || session.user.role !== "CONTRIBUTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Department name is required" },
        { status: 400 }
      );
    }

    const department = await prisma.department.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle unique constraint violation
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Department already exists" },
          { status: 409 }
        );
      }
    }

    console.error("Failed to create department:", error);
    return NextResponse.json(
      { error: "Failed to create department" },
      { status: 500 }
    );
  }
}
