import { Input } from "./ui/input";
import { Search } from "lucide-react";
export default function ContestsSearch() {
  return (
    <div className="relative max-w-md w-full mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input type="text" placeholder="Search contests..." className="pl-10" />
    </div>
  );
}
