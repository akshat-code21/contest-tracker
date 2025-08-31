"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Contest } from "@/types/contest";
import { baseUrl } from "@/lib/constant";
import ContestCard from "./ContestCard";

interface InfiniteScrollContestListProps {
  platform?: string;
  searchQuery?: string;
  isBookmarksPage?: boolean;
  bookmarkedContestIds?: string[];
}

interface PaginationData {
  current_page: number;
  no_of_pages: number;
  total_contests: number;
  contests_per_page: number;
  has_more?: boolean;
}

export default function InfiniteScrollContestList({
  platform = "",
  searchQuery = "",
  isBookmarksPage = false,
  bookmarkedContestIds = []
}: InfiniteScrollContestListProps) {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    setContests([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setInitialLoading(true);
  }, [platform, searchQuery, isBookmarksPage]);

  const fetchContests = useCallback(async (pageNum: number, reset: boolean = false) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      let newContests: Contest[] = [];
      let paginationData: PaginationData | null = null;

      if (isBookmarksPage) {
        if (pageNum === 1) {
          const response = await axios.get(`${baseUrl}/bookmark`);
          newContests = response.data || [];
          setHasMore(false);
        }
      } else if (!platform || platform === "all") {
        const response = await axios.get(`${baseUrl}/all?page=${pageNum}`);
        newContests = response.data.contests || [];
        paginationData = response.data.pagination;

        if (paginationData) {
          setHasMore(pageNum < paginationData.no_of_pages && newContests.length > 0);
        }
      } else {
        if (pageNum === 1) {
          const response = await fetch(`${baseUrl}/${platform}`, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache'
            }
          });
          const data = await response.json();
          newContests = Array.isArray(data) ? data : [];
          setHasMore(false);
        }
      }

      if (searchQuery && newContests.length > 0) {
        newContests = newContests.filter(
          (contest) =>
            contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contest.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contest.id?.toString().includes(searchQuery.toString())
        );
      }

      if (reset || newContests.length > 0) {
        setContests(prev => reset ? newContests : [...prev, ...newContests]);
      }

      if (!paginationData && !reset && newContests.length === 0) {
        setHasMore(false);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching contests:", err);
      setError("Failed to load contests. Please try again.");
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      loadingRef.current = false;
    }
  }, [platform, searchQuery, isBookmarksPage]);

  useEffect(() => {
    if (initialLoading) {
      fetchContests(1, true);
    }
  }, [fetchContests, initialLoading]);

  useEffect(() => {
    if (page > 1) {
      fetchContests(page, false);
    }
  }, [page, fetchContests]);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !initialLoading) {
          setPage(prev => prev + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, initialLoading]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setError(null);
    setPage(1);
    setHasMore(true);
    fetchContests(1, true);
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        <span className="ml-3 text-lg">Loading contests...</span>
      </div>
    );
  }

  if (error && contests.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ContestCard
        contests={contests}
        isBookmarksPage={isBookmarksPage}
        bookmarkedContestIds={bookmarkedContestIds}
      />

      <div ref={loadMoreRef} className="flex justify-center items-center py-8">
        {loading && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading more contests...</span>
          </div>
        )}

        {!loading && hasMore && contests.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Load More
          </button>
        )}

        {!hasMore && contests.length > 0 && (
          <div className="text-gray-500 dark:text-gray-400 text-center">
            <p>You've reached the end of the contests.</p>
            {searchQuery && (
              <p className="text-sm mt-1">Try adjusting your search query for more results.</p>
            )}
          </div>
        )}

        {error && contests.length > 0 && (
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {contests.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery ? "No contests found" : "No contests available"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery
              ? "Try adjusting your search terms or check back later for new contests."
              : "Check back later for upcoming contests or try refreshing the page."
            }
          </p>
        </div>
      )}
    </div>
  );
}
