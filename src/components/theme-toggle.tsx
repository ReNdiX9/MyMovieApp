import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={`p-2 rounded-md transition-transform duration-500 cursor-pointer ${
        isLight ? "rotate-0" : "rotate-360"
      }`}
      aria-label="Toggle theme"
    >
      {isLight ? (
        <Sun className="h-6 w-6 transform rotate-0 transition-all text-yellow-500" />
      ) : (
        <Moon className="h-6 w-6 transform  transition-all text-blue-500" />
      )}
    </button>
  );
}
