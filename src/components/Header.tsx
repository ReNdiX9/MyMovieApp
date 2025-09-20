import { useRef, useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "lucide-react";
import useDebounce from "./hooks/UseDebuncer";
import { useSearchStore } from "@/store/store";

export default function Header() {
  const ref = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 400);
  const setQuery = useSearchStore((s) => s.setQuery);
  // const query = useSearchStore((s) => s.query);

  useEffect(() => {
    setQuery(debouncedSearchTerm.trim());
    console.log("Fetching data for:", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Debugging: Log when the store's query changes
  // useEffect(() => {
  //   console.log("store query changed:", query);
  // }, [query]);

  return (
    <header
      className="sticky top-0 z-10 h-14
                 backdrop-blur-sm  
                 border-b border-white/30 
                 flex items-center justify-between px-4 shadow mb-4"
    >
      <div className="h-full px-4 flex items-center">
        <h1 className="text-lg font-bold">MovieApp</h1>
      </div>
      <div className="relative flex items-center space-x-2">
        <Search className="absolute  left-1" onClick={() => ref.current?.focus()} />
        <input
          type="text"
          className="p-1.5 px-8  rounded-3xl outline-none border shadow-sm "
          ref={ref}
          maxLength={20}
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
