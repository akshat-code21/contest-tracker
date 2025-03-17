import { Input } from "./ui/input";
import { Search } from "lucide-react";
export default function ContestsSearch() {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8 px-4">
      <div className="absolute inset-y-0 left-4 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input type="text" placeholder="Search contests..." className="pl-10" />
    </div>
  );
}
