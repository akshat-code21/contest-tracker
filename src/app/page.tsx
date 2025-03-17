import ContestCard from "@/components/ContestCard";
import ContestsSearch from "@/components/ContestsSearch";
import Header from "@/components/Header";
import PlatFormFilters from "@/components/PlatformFilters";
import axios from "axios";
import { Contest } from "./types/contest";

export default async function Home({
  searchParams,
}: {
  searchParams: { platform?: string };
}) {
  const params = await searchParams;
  const platform = params.platform
  
  const fetchCodeChefContests = async () => {
    const response = await axios.get("http://localhost:3000/api/codechef");
    return response.data;
  };
  
  const fetchCodeForcesContests = async () => {
    const response = await axios.get("http://localhost:3000/api/codeforces");
    return response.data;
  };

  let contests: Contest[] = [];
  
  if (!platform || platform === "all platforms") {
    const [codechefData, codeforcesData] = await Promise.all([
      fetchCodeChefContests(),
      fetchCodeForcesContests(),
    ]);
    contests = [...codechefData, ...codeforcesData];
  } else if (platform === "codechef") {
    contests = await fetchCodeChefContests();
  } else if (platform === "codeforces") {
    contests = await fetchCodeForcesContests();
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
