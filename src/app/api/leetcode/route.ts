import parseDateString from "@/lib/parseDateString";
import axios from "axios";
interface LeetCodeContests {
  title: string;
  duration: number;
  startTime: number;
}
export async function GET() {
  try {
    const response = await axios.get(
      "https://competeapi.vercel.app/contests/leetcode/"
    );
    const result = response.data.data.topTwoContests;

    const getFormattedContest = (
      contest: LeetCodeContests,
      status: string
    ) => ({
      platform: "LeetCode",
      status: new Date(contest.startTime * 1000) > new Date(Date.now()) ? "upcoming" : "completed",
      name: contest.title,
      startTime: parseDateString(
        new Date(contest.startTime * 1000).toISOString()
      ),
      duration: contest.duration / 3600 + " hours",
      href: `https://www.leetcode.com/contest/${contest.title.replaceAll(
        " ",
        "-"
      )}`,
    });
    let formattedContests:LeetCodeContests[] = [];
    formattedContests = result.map((contest:LeetCodeContests)=>
        getFormattedContest(contest,"ongoing")
    )
    return new Response(JSON.stringify(formattedContests));
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
