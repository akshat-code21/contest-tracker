import ContestCard from "@/components/ContestCard";
import ContestsSearch from "@/components/ContestsSearch";
import Header from "@/components/Header";
import PlatFormFilters from "@/components/PlatformFilters";
import axios from "axios";

export default async function Home() {
  const fetchCodeChefContests = async () => {
    const response = await axios.get("http://localhost:3000/api/codechef");
    return response.data;
  };
  const contests = await fetchCodeChefContests();
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
