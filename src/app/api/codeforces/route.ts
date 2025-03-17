import parseDateString from "@/lib/parseDateString";

interface CodeForcesContests {
  id: number;
  name: string;
  phase: string;
  durationSeconds: number;
  startTimeSeconds: number;
}

export async function GET() {
  try {
    const response = await fetch("https://codeforces.com/api/contest.list");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const result = data.result;

    const futureContests = result.filter(
      (contest: CodeForcesContests) => contest.phase === "BEFORE"
    );

    const presentContests = result.filter(
      (contest: CodeForcesContests) => contest.phase === "CODING"
    );

    const pastContests = result
      .filter((contest: CodeForcesContests) => contest.phase === "FINISHED")
      .slice(0, 50);

    const getFormattedContest = (
      contest: CodeForcesContests,
      status: string
    ) => ({
      id: contest.id,
      platform: "CodeForces",
      status: status,
      name: contest.name,
      startTime: parseDateString(
        new Date(contest.startTimeSeconds * 1000).toISOString()
      ),
      duration: contest.durationSeconds / 3600 + " hours",
      href: `https://www.codeforces.com/contest/${contest.id}`,
    });

    const formattedContests = [
      ...futureContests.map((contest: CodeForcesContests) =>
        getFormattedContest(contest, "upcoming")
      ),
      ...presentContests.map((contest: CodeForcesContests) =>
        getFormattedContest(contest, "ongoing")
      ),
      ...pastContests.map((contest: CodeForcesContests) =>
        getFormattedContest(contest, "completed")
      ),
    ];

    return new Response(JSON.stringify(formattedContests), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("Error fetching CodeForces contests:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch contests" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
