import { useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "lucide-react";

export default function Header() {
  const ref = useRef<HTMLInputElement>(null);
  function onClick() {
    ref.current?.focus();
  }
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
        <Search className="absolute top-50% left-1" onClick={onClick} />
        <input
          type="text"
          className="p-1.5 px-8  rounded-3xl outline-none border shadow-sm "
          ref={ref}
          maxLength={20}
        />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
