"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnnouncementForm from "./announcement-form";
import { createAnnouncement } from "@/app/actions/announcements";
import { getDepartments } from "@/app/actions/departments";

export default function NewAnnouncementForm() {
  const router = useRouter();
  const [departments, setDepartments] = useState<
    Array<{
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }>
  >([]);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchDepartments() {
      const result = await getDepartments();
      if (result.success && result.data) {
        setDepartments(result.data);
      } else {
        setError(result.error || "Failed to fetch departments");
      }
    }
    fetchDepartments();
  }, []);

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }

  return (
    <AnnouncementForm
      departments={departments}
      isSubmitting={isSubmitting}
      onSubmit={async (data) => {
        try {
          setIsSubmitting(true);
          setError("");

          if (!data.departments.length) {
            throw new Error("Please select at least one department");
          }

          const result = await createAnnouncement(data);
          if (result.success) {
            router.push("/dashboard");
          } else {
            throw new Error(result.error || "Failed to create announcement");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setIsSubmitting(false);
        }
      }}
    />
  );
}
