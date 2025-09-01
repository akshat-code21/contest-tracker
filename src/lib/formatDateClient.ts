// Client-side date formatting function that always uses the user's local timezone
export function formatDateClient(isoDateString: string): string {
  const date = new Date(isoDateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = date.getDate();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${month} ${formattedDate}, ${year}, ${time}`;
}
