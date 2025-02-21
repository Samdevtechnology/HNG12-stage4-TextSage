import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return (
      <span className="animate-pulse min-w-[28px] min-h-[28px] dark:bg-[#FAEBD7] dark:text-black text-white bg-[#292a2d] border dark:border-[#FAEBD7] border-[#292a2d] rounded-full p-2"></span>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`dark:bg-[#FAEBD7] dark:text-black text-white bg-[#292a2d] border dark:border-[#FAEBD7] border-[#292a2d] rounded-full p-2`}
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
