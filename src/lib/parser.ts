export const getDate = (startTime: string) => {
  const d = new Date(startTime);
  d.setHours(0, 0, 0, 0); // reset time to midnight
  return d.getTime();
};

export function getTimeUntil(startTime: Date): string {
  const now = new Date();
  const diff = startTime.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  let timeUntil = "";
  if (days > 0) timeUntil += `${days} days `;
  if (hours > 0) timeUntil += `${hours} hours `;
  if (minutes > 0) timeUntil += `${minutes} minutes`;

  return timeUntil.trim();
}
