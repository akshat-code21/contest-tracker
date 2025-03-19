"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Bookmark, Calendar, Clock, CloudCog, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { Contest } from "@/app/types/contest";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ContestCard({ contests }: { contests: Contest[] }) {
  const [bookmarkedContests, setBookmarkedContests] = useState<string[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:3000"
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/bookmark`);
        const bookmarks = response.data;
        setBookmarkedContests(bookmarks.map((bookmark: Contest) => bookmark.id));
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      }
    };
    loadBookmarks();
  }, []);

  const checkPlatform = (platform: string): string => {
    switch (platform) {
      case "codeforces":
        return "bg-cf-secondary text-cf-primary";
      case "codechef":
        return "bg-cc-secondary text-cc-primary";
      case "leetcode":
        return "bg-lc-secondary text-lc-primary";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };
  const checkPlatformForBg = (platform: string): string => {
    switch (platform) {
      case "codeforces":
        return "bg-cf-primary";
      case "codechef":
        return "bg-cc-primary";
      case "leetcode":
        return "bg-lc-primary";
      default:
        return "bg-gray-200 ";
    }
  };

  const checkStatus = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-upcoming-secondary text-upcoming-primary";
      case "completed":
        return "bg-completed-secondary text-completed-primary";
      case "ongoing":
        return "bg-ongoing-secondary text-ongoing-primary";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };
  const handleBookmark = async (contest: Contest) => {
    try {
      const isBookmarked = bookmarkedContests.includes(contest.id);
      const response = await axios({
        method: isBookmarked ? 'DELETE' : 'POST',
        url: "/api/bookmark",
        data: contest
      });
      
      if (response.status === 200) {
        setBookmarkedContests(prev => 
          isBookmarked 
            ? prev.filter(id => id !== contest.id)
            : [...prev, contest.id]
        );
        console.log(isBookmarked ? "Contest unbookmarked" : "Contest bookmarked");
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {contests?.length > 0 ? (
        contests.map((contest: Contest) => {
          return (
            <Card
              key={contest.id || contest.name}
              className={cn("flex flex-col items-start w-full relative group")}
            >
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                  checkPlatformForBg(contest.platform.toLowerCase()),
                  "transition-all duration-300",
                  "group-hover:h-2.5"
                )}
              />
              <CardHeader className="flex flex-col w-full">
                <div className={cn("w-full h-3")}></div>
                <div className="flex justify-between items-center w-full">
                  <div
                    className={cn(
                      `${checkPlatform(contest.platform.toLowerCase())}`,
                      "rounded-sm px-2 py-1 text-sm font-medium"
                    )}
                  >
                    {contest.platform}
                  </div>
                  <div
                    className={cn(
                      `${checkStatus(contest.status.toLowerCase())}`,
                      "rounded-sm px-2 py-1 text-sm font-medium uppercase"
                    )}
                  >
                    {contest.status}
                  </div>
                </div>
                <CardTitle className="font-medium mt-2">
                  {contest.name}
                </CardTitle>
                <CardDescription className="mt-2 flex flex-col gap-y-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <Calendar size={16} />
                    </div>
                    <div>{contest.startTime}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <Clock size={16} />
                    </div>
                    <div>{contest.duration}</div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardFooter className="w-full gap-3 flex-1 flex items-center">
                <Link href={contest.href} target="_blank" className="w-full">
                  <Button variant={"outline"} className="w-full cursor-pointer">
                    Visit {contest.platform}
                    <span>
                      <ExternalLink />
                    </span>
                  </Button>
                </Link>
                <Button 
                  variant={bookmarkedContests.includes(contest.id) ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleBookmark(contest)}
                >
                  Bookmark
                  <span>
                    <Bookmark className={bookmarkedContests.includes(contest.id) ? "fill-current" : ""} />
                  </span>
                </Button>
                <Button 
                  variant={"destructive"} 
                  className="cursor-pointer"
                  // onClick={() => handleYT(contest)}
                >
                  Youtube
                  <span>
                    <Youtube />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div className="col-span-full flex justify-center items-center text-4xl py-12">
          No Contests Found.
        </div>
      )}
    </div>
  );
}
