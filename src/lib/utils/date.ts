export function formatDate(date: Date | string | null): string {
  if (!date) return "Ongoing";

  // Ensure we have a Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Use a consistent date format
  return dateObj.toISOString().split("T")[0];
}
