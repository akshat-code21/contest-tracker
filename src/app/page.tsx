import { Metadata } from "next";
import ContestCard from "@/components/ContestCard";
import ContestsSearch from "@/components/ContestsSearch";
import Header from "@/components/Header";
import PlatFormFilters from "@/components/PlatformFilters";
import axios from "axios";
import { Contest } from "./types/contest";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contest Tracker",
  description: "Track programming contests from different platforms",
};

type PageParams = Promise<{
  slug: string[];
  searchParams: { [key: string]: string | string[] | undefined };
}>;

export default async function Home(props: { params: PageParams }) {
  const { searchParams } = await props.params;

  const platform = searchParams?.platform as string | undefined;
  const searchQuery = searchParams?.contest as string | undefined;

  let contests: Contest[] = [];

  try {
    if (!platform || platform === "all platforms") {
      const [codechefData, codeforcesData, leetcodeData] = await Promise.all([
        axios.get("/api/codechef").then((res) => res.data),
        axios.get("/api/codeforces").then((res) => res.data),
        axios.get("/api/leetcode").then((res) => res.data),
      ]);
      contests = [...codechefData, ...codeforcesData, ...leetcodeData];
    } else {
      const response = await axios.get(`/api/${platform}`);
      contests = response.data;
    }

    if (searchQuery) {
      contests = contests.filter(
        (contest) =>
          contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contest.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contest.id.toString().includes(searchQuery.toString())
      );
    }
  } catch (error) {
    console.error("Error fetching contests:", error);
    contests = [];
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="my-8 sm:my-12">
        <Header />
        <Suspense fallback={<div>Loading filters...</div>}>
          <PlatFormFilters />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading search...</div>}>
        <ContestsSearch />
      </Suspense>
      <ContestCard contests={contests} />
    </div>
  );
}
