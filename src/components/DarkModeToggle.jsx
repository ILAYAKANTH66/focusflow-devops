import { motion } from "framer-motion";

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-medium shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80"
      type="button"
    >
      <motion.span
        key={darkMode ? "dark" : "light"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {darkMode ? "Dark Mode" : "Light Mode"}
      </motion.span>
    </button>
  );
}

export default DarkModeToggle;
