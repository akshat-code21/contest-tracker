import { Metadata } from "next";
import InfiniteScrollContestList from "@/components/InfiniteScrollContestList";
import ContestsSearch from "@/components/ContestsSearch";
import Header from "@/components/Header";
import PlatFormFilters from "@/components/PlatformFilters";
import { Suspense } from "react";
import ToggleTheme from "@/components/ToggleTheme";

export const metadata: Metadata = {
  title: "Contest Tracker",
  description: "Track programming contests from different platforms",
};

type PageProps = {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ params, searchParams }: PageProps) {
  const searchParamsResolved = await searchParams;
  const platform = searchParamsResolved?.platform?.toString().toLowerCase() || "";
  const searchQuery = searchParamsResolved?.contest?.toString() || "";
  const isBookmarksPage = platform === "bookmarks";

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="my-8 sm:my-12">
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Header />
            <ToggleTheme />
          </div>
          <Suspense fallback={<div>Loading filters...</div>}>
            <PlatFormFilters />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading search...</div>}>
        <ContestsSearch />
      </Suspense>
      <InfiniteScrollContestList
        platform={platform}
        searchQuery={searchQuery}
        isBookmarksPage={isBookmarksPage}
      />
    </div>
  );
}
