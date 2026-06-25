interface AtCoderContest {
  id: string;
  start_epoch_second: number;
  duration_second: number;
  title: string;
  rate_change: string;
}

export async function GET() {
  try {
    const response = await fetch(
      "https://kenkoooo.com/atcoder/resources/contests.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const now = Math.floor(Date.now() / 1000);

    const formattedContests = data.map((contest: AtCoderContest) => {
      const start = contest.start_epoch_second;
      const end = start + contest.duration_second;

      let status: string;
      if (now < start) {
        status = "upcoming";
      } else if (now >= start && now < end) {
        status = "ongoing";
      } else {
        status = "completed";
      }

      const durationHours = Math.floor(contest.duration_second / 3600);
      const durationMinutes = Math.floor(
        (contest.duration_second % 3600) / 60
      );
      const duration =
        durationMinutes > 0
          ? `${durationHours}h ${durationMinutes}m`
          : `${durationHours} hours`;

      const isoDate = new Date(contest.start_epoch_second * 1000).toISOString();

      return {
        id: contest.id,
        platform: "AtCoder",
        status,
        name: contest.title,
        startTime: isoDate,
        startTimeISO: isoDate,
        duration,
        href: `https://atcoder.jp/contests/${contest.id}?lang=en`,
      };
    });

    const sortedUpcoming = formattedContests
      .filter((c: any) => c.status === "upcoming")
      .sort(
        (a: any, b: any) =>
          new Date(a.startTimeISO).getTime() -
          new Date(b.startTimeISO).getTime()
      );

    const sortedOngoing = formattedContests
      .filter((c: any) => c.status === "ongoing")
      .sort(
        (a: any, b: any) =>
          new Date(a.startTimeISO).getTime() -
          new Date(b.startTimeISO).getTime()
      );

    const sortedCompleted = formattedContests
      .filter((c: any) => c.status === "completed")
      .sort(
        (a: any, b: any) =>
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
