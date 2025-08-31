import { Contest } from "@/app/types/contest";
import { getDate } from "@/lib/parser";
import { NextResponse, NextRequest } from "next/server";
import { baseUrl } from "@/lib/constant";

export async function GET() {
  let contests: Contest[] = [];
    const [codechefData, codeforcesData, leetcodeData] = await Promise.all([
    fetch(`${baseUrl}/codechef`).then((res) =>
      res.json()
    ),
    fetch(`${baseUrl}/codeforces`).then((res) =>
      res.json()
    ),
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
  const y = contests
    .filter((contest) => contest.status !== "upcoming")
  contests = [...x, ...y];
  return Response.json(contests);
}
