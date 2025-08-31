import { Contest } from "@/types/contest";
import { getDate } from "@/lib/parser";
import { NextResponse, NextRequest } from "next/server";
import { baseUrl } from "@/lib/constant";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  let contests: Contest[] = [];
  const [codechefData, codeforcesData, leetcodeData] = await Promise.all([
    fetch(`${baseUrl}/codechef`).then((res) => res.json()),
    fetch(`${baseUrl}/codeforces`).then((res) => res.json()),
    fetch(`${baseUrl}/leetcode`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      }),
  ]);

  contests = [
    ...(Array.isArray(codechefData) ? codechefData : []),
    ...(Array.isArray(codeforcesData) ? codeforcesData : []),
    ...(Array.isArray(leetcodeData) ? leetcodeData : []),
  ];
  // console.log(typeof contests[0].startTime);
  const x = contests
    .filter((contest) => contest.status === "upcoming")
    .sort((a, b) => {
      const da = getDate(a.startTime);
      const db = getDate(b.startTime);
      return da - db;
    });
  const y = contests.filter((contest) => contest.status !== "upcoming");
  contests = [...x, ...y];

  const contests_per_page = 9;
  const total_contests = contests.length;
  const no_of_pages = Math.ceil(total_contests / contests_per_page);

  let start = (page - 1) * contests_per_page;
  let end = start + contests_per_page;

  const paginatedContests = contests.slice(start, end);

  return Response.json({
    contests: paginatedContests,
    pagination: {
      current_page: page,
      no_of_pages: no_of_pages,
      total_contests: total_contests,
      contests_per_page: contests_per_page,
    },
  });
}
