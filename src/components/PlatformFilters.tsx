"use client";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function PlatFormFilters() {
  const buttons = [
    {
      icon: <Globe size={14} color="lightblue" />,
      title: "All Platforms",
      className: "bg-icon text-white",
    },
    {
      icon: "CF",
      title: "Codeforces",
      className: "bg-cf-secondary text-cf-primary",
    },
    {
      icon: "LC",
      title: "LeetCode",
      className: "bg-lc-secondary text-lc-primary",
    },
    {
      icon: "CC",
      title: "CodeChef",
      className: "bg-cc-secondary text-cc-primary",
    },
  ];
  const searchParams = useSearchParams();
  const platform = searchParams.get("platform");
  const isActive = (currPlatform: string) => {
    if (currPlatform === "all platforms") {
      return !platform; 
    }
    return platform === currPlatform;
  };
  const fetchActiveStyles = (platform: string): string => {
    switch (platform) {
      case "codeforces":
        return "bg-cf text-cf-secondary";
      case "codechef":
        return "bg-cc text-cc-secondary";
      case "leetcode":
        return "bg-lc text-lc-secondary";
      default:
        return "bg-icon text-white";
    }
  };
  const fetchInActiveStyles = (platform: string): string => {
    switch (platform) {
      case "codeforces":
        return "bg-cf-secondary text-cf-primary";
      case "codechef":
        return "bg-cc-secondary text-cc-primary";
      case "leetcode":
        return "bg-lc-secondary text-lc-primary";
      default:
        return "bg-inactive text-icon";
    }
  };
  return (
    <div className="flex items-center w-full justify-start md:justify-center gap-2 my-4 sm:my-8 px-4 overflow-x-auto no-scrollbar">
      {buttons.map((button) => {
        return (
          <div
            key={button.title}
            className="cursor-pointer transform hover:scale-105 active:scale-95 hover:shadow-elevation-low transition-all duration-300"
          >
            <Link
              className={cn(
                `cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border border-transparent whitespace-nowrap ${button.className}`,
                `${
                  isActive(button.title.toLowerCase())
                    ? `${fetchActiveStyles(button.title.toLowerCase())}`
                    : `${fetchInActiveStyles(button.title.toLowerCase())}`
                }`
              )}
              href={`${
                button.title.toLowerCase() !== "all platforms"
                  ? `/?platform=${button.title.toLowerCase()}`
                  : "/"
              }`}
            >
              <span className="text-xs font-bold">{button.icon}</span>
              <span className="font-medium">{button.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
