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
                <Button variant={"outline"} className="w-full cursor-pointer">
                  Visit {contest.platform}
                  <span>
                    <ExternalLink />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
}
