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
    <div className="flex items-center w-full justify-center gap-4 my-12">
      {buttons.map((button) => {
        return (
          <div key={button.title}>
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-transparent ${button.className}`}
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
