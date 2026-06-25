import { Code, Bell } from "lucide-react";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex items-center justify-center w-full flex-col px-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-icon text-icon-foreground">
          <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight">
          Contest Tracker
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm sm:text-base text-subtitle">Stay updated with the latest competitive programming contests from Codeforces, LeetCode, and CodeChef.</span>
        <Link
          href="/reminders"
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-subtitle hover:text-foreground transition-colors whitespace-nowrap"
        >
          <Bell size={14} />
          My Reminders
        </Link>
      </div>
    </div>
  );
}
