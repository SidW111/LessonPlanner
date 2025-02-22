import React, { useState, useEffect } from "react";

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  if (!isClient) return null; // ✅ Prevents SSR mismatch

  return (
    <button
      onClick={() => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
      }}
      className="p-2 border rounded"
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
