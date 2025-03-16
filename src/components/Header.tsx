import { Code } from "lucide-react";
export default function Header() {
  return (
    <div className="flex items-center justify-center w-full flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-icon text-icon-foreground">
          <Code className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Contest Tracker
        </h1>
      </div>
      <div>
        <span className="text-subtitle">Stay updated with the latest competitive programming contests from Codeforces, LeetCode, and CodeChef.</span>
      </div>
    </div>
  );
}
