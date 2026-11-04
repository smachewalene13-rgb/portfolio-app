import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all cursor-pointer select-none text-xs font-bold tracking-wide ${
        isDark
          ? "bg-slate-900/90 border-slate-700 hover:border-violet-400 text-slate-200 shadow-sm"
          : "bg-white border-slate-300 hover:border-violet-500 text-slate-800 shadow-sm"
      } ${className}`}
    >
      {/* Icon with smooth rotation */}
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center text-sm"
      >
        {isDark ? (
          // Moon icon
          <svg
            className="w-4 h-4 text-violet-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          // Sun icon
          <svg
            className="w-4 h-4 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </motion.div>

      {/* Label */}
      <span className="hidden sm:inline font-semibold">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
