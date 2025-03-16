import ContestCard from "@/components/ContestCard";
import ContestsSearch from "@/components/ContestsSearch";
import Header from "@/components/Header";
import PlatFormFilters from "@/components/PlatformFilters";

export default async function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="my-12">
        <Header />
        <PlatFormFilters />
      </div>
      <ContestsSearch />
      <ContestCard/>
    </div>
  );
}
