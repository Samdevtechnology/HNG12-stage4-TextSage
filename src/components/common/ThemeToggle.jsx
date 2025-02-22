import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeToggle = (small) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return (
      <span
        className={cn(
          "animate-pulse min-w-7 min-h-7 dark:bg-[#FAEBD7] dark:text-black text-white bg-[#292a2d] border dark:border-[#FAEBD7] border-[#292a2d] rounded-full p-2",
          small && "max-w-9 p-1 max-h-9"
        )}
      ></span>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        `dark:bg-[#FAEBD7] dark:text-black text-white bg-[#292a2d] border dark:border-[#FAEBD7] border-[#292a2d] rounded-full p-2`,
        small && "flex max-w-9 p-1 max-h-9 justify-center items-center"
      )}
      aria-label="Toggle Theme"
    >
      {currentTheme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
