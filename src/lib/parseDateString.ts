// DEPRECATED: This function is no longer used as of the timezone fix
// All date formatting is now done client-side using formatDateClient()
// This file is kept for potential legacy compatibility but should not be used

export default function parseDateString(dateString: string) {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = date.getDate();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${month} ${formattedDate}, ${year}, ${time}`
}
