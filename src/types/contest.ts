export interface Contest {
  id: string | number;
  name: string;
  platform: string;
  startTime: string;
  startTimeISO: string; // Raw ISO timestamp for client-side formatting
  duration: string;
  status: string;
  href: string;
}
