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
interface Contest {
  id: string;
  platform: string;
  status: string;
  name: string;
  startTime: string;
  duration: string;
  href: string;
}
export default function ContestCard() {
  const dummyContests = [
    {
      id: "2081",
      platform: "Codeforces",
      status: "completed",
      name: "Codeforces Round #830 (Div. 2)",
      startTime: "Mar 18, 2025, 12:16 AM",
      duration: "2 hours",
      href: `https://codeforces.com/contest/2081`,
    },
    {
      id: "START179D",
      platform: "CodeChef",
      status: "upcoming",
      name: "CodeChef Starters 178",
      startTime: "Mar 20, 2025, 11:16 PM",
      duration: "3 hours",
      href: "https://www.codechef.com/START179D",
    },
    {
      id: "153",
      platform: "LeetCode",
      status: "ongoing",
      name: "LeetCode Biweekly Contest 153",
      startTime: "Mar 16, 2025, 8:16 PM",
      duration: "3 hours",
      href: "https://leetcode.com/contest/biweekly-contest-153/",
    },
  ] as Contest[];
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
    <div className="grid grid-cols-3 gap-x-5.5 gap-y-5.5 px-4">
      {dummyContests.map((contest: Contest) => {
        return (
          <Card key={contest.id} className="flex flex-col items-start w-full">
            <CardHeader className="flex flex-col w-full">
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
              <CardTitle className="font-medium mt-2">{contest.name}</CardTitle>
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
              <Button variant={"outline"} className="w-full cursor-pointer">
                Visit {contest.platform}
                <span>
                  <ExternalLink />
                </span>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
