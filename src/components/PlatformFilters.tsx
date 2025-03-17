import { Globe } from "lucide-react";
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
  return (
    <div className="flex items-center w-full justify-start md:justify-center gap-2 my-4 sm:my-8 px-4 overflow-x-auto no-scrollbar">
      {buttons.map((button) => {
        return (
          <div key={button.title}>
            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border border-transparent whitespace-nowrap ${button.className}`}
            >
              <span className="text-xs font-bold">{button.icon}</span>
              <span className="font-medium">{button.title}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
