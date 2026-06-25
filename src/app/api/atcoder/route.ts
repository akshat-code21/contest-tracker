import {
  fetchUpcomingContests,
  fetchRecentContests,
} from "@qatadaazzeh/atcoder-api";
import { Contest } from "@/types/contest";

function parseDuration(durationStr: string): string {
  const parts = durationStr.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (minutes > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${hours} hours`;
}

function parseDurationSeconds(durationStr: string): number {
  const parts = durationStr.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  return hours * 3600 + minutes * 60;
}

function determineStatus(startTime: Date, endTime: Date): string {
  const now = new Date();
  if (now < startTime) return "upcoming";
  if (now >= startTime && now < endTime) return "ongoing";
  return "completed";
}

function formatContest(contest: {
  contestId: string;
  contestName: string;
  contestTime: string;
  contestDuration: string;
  contestUrl: string;
}): Contest | null {
  const startTime = new Date(contest.contestTime);
  if (isNaN(startTime.getTime())) return null;

  const durationSeconds = parseDurationSeconds(contest.contestDuration);
  const endTime = new Date(startTime.getTime() + durationSeconds * 1000);
  const status = determineStatus(startTime, endTime);
  const isoDate = startTime.toISOString();

  return {
    id: contest.contestId,
    platform: "AtCoder",
    status,
    name: contest.contestName,
    startTime: isoDate,
    startTimeISO: isoDate,
    duration: parseDuration(contest.contestDuration),
    href: contest.contestUrl,
  };
}

export async function GET() {
  try {
    const [upcoming, recent] = await Promise.all([
      fetchUpcomingContests(),
      fetchRecentContests(),
    ]);

    const formattedContests: Contest[] = [];

    for (const contest of upcoming) {
      const formatted = formatContest(contest);
      if (formatted) formattedContests.push(formatted);
    }

    for (const contest of recent) {
      const formatted = formatContest(contest);
      if (formatted) formattedContests.push(formatted);
    }

    const sortedUpcoming = formattedContests
      .filter((c) => c.status === "upcoming")
      .sort(
        (a, b) =>
          new Date(a.startTimeISO).getTime() -
          new Date(b.startTimeISO).getTime()
      );

    const sortedOngoing = formattedContests
      .filter((c) => c.status === "ongoing")
      .sort(
        (a, b) =>
          new Date(a.startTimeISO).getTime() -
          new Date(b.startTimeISO).getTime()
      );

    const sortedCompleted = formattedContests
      .filter((c) => c.status === "completed")
      .sort(
        (a, b) =>
          new Date(a.startTimeISO).getTime() -
          new Date(b.startTimeISO).getTime()
      );

    const allSortedContests = [
      ...sortedUpcoming,
      ...sortedOngoing,
      ...sortedCompleted,
    ];

    return new Response(JSON.stringify(allSortedContests), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("Error fetching AtCoder contests:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch contests" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
