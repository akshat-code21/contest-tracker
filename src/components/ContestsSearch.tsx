"use client";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ContestsSearch() {
  const [inputVal, setInputVal] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    router.push(`/?${createQueryString("contest", value)}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8 px-4">
      <div className="absolute inset-y-0 left-4 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search contests..."
        className="pl-10"
        value={inputVal}
        onChange={handleChange}
      />
    </div>
  );
}
