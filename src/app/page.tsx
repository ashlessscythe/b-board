import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Redirect authenticated users based on their role
  if (session?.user) {
    switch (session.user.role) {
      case "PENDING":
        redirect("/pending");
      case "CONTRIBUTOR":
        redirect("/dashboard");
      case "VIEWER":
        redirect("/bulletins");
    }
  }

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to B-Board</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Your Department&apos;s Digital Bulletin Board System
          </p>
          <p className="text-sm text-red-500 mb-8">
            WARNING: Unauthorized use of this system is strictly prohibited and
            may result in disciplinary action. All activities are monitored and
            logged.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Announcement Management</CardTitle>
              <CardDescription>Create and Organize Content</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/file.svg"
                alt="Announcement icon"
                width={40}
                height={40}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground text-center">
                Create, edit, and manage announcements with ease
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Access</CardTitle>
              <CardDescription>Role-Based Permissions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/window.svg"
                alt="Access icon"
                width={40}
                height={40}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground text-center">
                Secure access control for Contributors and Viewers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Friendly</CardTitle>
              <CardDescription>Access Anywhere</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/globe.svg"
                alt="Mobile icon"
                width={40}
                height={40}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground text-center">
                Responsive design that works on all devices
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <a
            className="rounded-lg bg-primary text-primary-foreground shadow hover:bg-primary/90 px-8 py-3 font-medium"
            href="/login"
          >
            Get Started
          </a>
        </div>
      </main>
    </div>
  );
}
