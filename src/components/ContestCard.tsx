import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Calendar, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { Contest } from "@/app/types/contest";
import Link from 'next/link';

export default function ContestCard({ contests }: { contests: Contest[] }) {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {contests?.length > 0 ? (
        contests.map((contest: Contest) => {
          return (
            <Card
              key={contest.name}
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
              <CardFooter className="w-full">
                <Link href={contest.href} target="_blank" className="w-full">
                  <Button variant={"outline"} className="w-full cursor-pointer">
                    Visit {contest.platform}
                    <span>
                      <ExternalLink />
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div className="flex justify-center items-center text-4xl absolute mx-auto top-1/2 left-[40%]">
          No Contests Found.
        </div>
      )}
    </div>
  );
}
