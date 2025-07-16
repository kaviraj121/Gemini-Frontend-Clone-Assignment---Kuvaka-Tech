import { useDarkModeStore } from "../../hooks/useDarkModeStore";

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkModeStore();

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 text-sm border rounded dark:border-white"
    >
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
