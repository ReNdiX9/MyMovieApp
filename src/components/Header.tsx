import { useRef, useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "lucide-react";
import useDebounce from "./hooks/UseDebuncer";
import { useSearchStore } from "@/store/store";
import { type CurrentMoviesCategories } from "@/lib/types";

export default function Header() {
  //use ref for focusing on input when clicked on Search icon
  const ref = useRef<HTMLInputElement>(null);
  // Controlled state for search input and a function to set it
  const [search, setSearch] = useState("");
  //Debounce custom hook
  const debouncedSearchTerm = useDebounce(search, 400);
  //store variables for setting query function , category and function to set category
  const setQuery = useSearchStore((s) => s.setQuery);
  const category = useSearchStore((s) => s.category);
  const setCategory = useSearchStore((s) => s.setCategory);

  //obj with  properties  of type CurrentMoviesCategories and string values
  const tabs: Record<CurrentMoviesCategories, string> = {
    popular: "Popular",
    top_rated: "Top Rated",
    upcoming: "Upcoming",
  };

  //Set query to store when we type and set query
  useEffect(() => {
    setQuery(debouncedSearchTerm.trim());
    console.log("Fetching data for(query):", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
          className="p-1.5 px-8  rounded-3xl outline-none  shadow-sm border-2 "
          ref={ref}
          maxLength={20}
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Tabs */}
      <div className="flex space-x-4 font-medium">
        {Object.entries(tabs).map(([key, label]) => {
          const k = key as CurrentMoviesCategories;
          const active = category === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setCategory(k)}
              aria-pressed={active}
              className={`pb-1 transition  cursor-pointer ${
                active ? "border-b-2 border-blue-500 text-blue-500" : null
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
