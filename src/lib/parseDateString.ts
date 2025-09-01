export default function parseDateString(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formatted = date.toLocaleString("en-US", options);
  return formatted.replace(" at ", ", ");
}
