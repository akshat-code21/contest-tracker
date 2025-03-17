import ContestCard from "@/components/ContestCard";
import ContestsSearch from "@/components/ContestsSearch";
import Header from "@/components/Header";
import PlatFormFilters from "@/components/PlatformFilters";
import axios from "axios";
import { Contest } from "./types/contest";

export default async function Home({
  searchParams,
}: {
  searchParams: { platform?: string; contest?: string };
}) {
  const params = await searchParams;
  const platform = params.platform;
  const searchQuery = params.contest;
  const fetchCodeChefContests = async () => {
    const response = await axios.get("http://localhost:3000/api/codechef");
    return response.data;
  };

  const fetchCodeForcesContests = async () => {
    const response = await axios.get("http://localhost:3000/api/codeforces");
    return response.data;
  };

  const fetchLeetCodeContests = async () => {
    const response = await axios.get("http://localhost:3000/api/leetcode");
    return response.data;
  };

  let contests: Contest[] = [];

  if (!platform || platform === "all platforms") {
    const [codechefData, codeforcesData,leetcodeData] = await Promise.all([
      fetchCodeChefContests(),
      fetchCodeForcesContests(),
      fetchLeetCodeContests(),
    ]);
    contests = [...codechefData, ...codeforcesData,...leetcodeData];
  } else if (platform === "codechef") {
    contests = await fetchCodeChefContests();
  } else if (platform === "codeforces") {
    contests = await fetchCodeForcesContests();
  } else if (platform === "leetcode") {
    contests = await fetchLeetCodeContests();
  }

  if (searchQuery) {
    contests = contests.filter(
      (contest) =>
        contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contest.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contest.id.toString().includes(searchQuery.toString())
    );
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="my-8 sm:my-12">
        <Header />
        <PlatFormFilters />
      </div>
      <ContestsSearch />
      <ContestCard contests={contests} />
    </div>
  );
}
