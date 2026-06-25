import parseDuration from "@/lib/parseDuration";
interface CodeChefContest {
  contest_code: number;
  contest_name: string;
  contest_start_date_iso: string;
  contest_duration: string;
}
export async function GET() {
  try {
    const response = await fetch(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all",
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const futureContests = data.future_contests;
    const presentContests = data.present_contests;
    const pastContests = data.past_contests;

    const getFormattedContest = (contest: CodeChefContest, status: string) => ({
      id: contest.contest_code,
      platform: "CodeChef",
      status: status,
      name: contest.contest_name,
      startTime: contest.contest_start_date_iso,
      startTimeISO: contest.contest_start_date_iso,
      duration: parseDuration(contest.contest_duration) + " hours",
      href: `https://www.codechef.com/${contest.contest_code}`,
    });

    const formattedContests = [
      ...futureContests.map((contest: CodeChefContest) =>
        getFormattedContest(contest, "upcoming")
      ),
      ...presentContests.map((contest: CodeChefContest) =>
        getFormattedContest(contest, "ongoing")
      ),
      ...pastContests.map((contest: CodeChefContest) =>
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
    console.error("Error fetching CodeChef contests:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch contests" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
