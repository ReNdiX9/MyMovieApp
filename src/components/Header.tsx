import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-10 h-14
                 backdrop-blur-sm  
                 border-b border-white/10
                 flex items-center justify-between px-4 shadow"
    >
      <div className="h-full px-4 flex items-center">
        <h1 className="text-lg font-bold">MovieApp</h1>
      </div>
      <div className="flex gap-8">
        <input type="text" />
        <a>Popular</a>
        <a>TopRated</a>
        <a>Upcoming</a>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
