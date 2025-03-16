import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "./ui/card";
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
  return (
    <div className="grid grid-cols-3">
      {dummyContests.map((contest: Contest) => {
        return (
          <Card key={contest.id}>
            <CardHeader className="flex justify-between items-center">
              <div
                className={`${checkPlatform(contest.platform.toLowerCase())}`}
              >
                {contest.platform}
              </div>
              <div>{contest.status}</div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
