import { motion } from "framer-motion";
import DarkModeToggle from "../components/DarkModeToggle";
import NotesSection from "../components/NotesSection";
import PomodoroTimer from "../components/PomodoroTimer";
import StatsDashboard from "../components/StatsDashboard";
import TaskManager from "../components/TaskManager";

function DashboardPage({
  darkMode,
  toggleDarkMode,
  taskProps,
  pomodoroProps,
  statsProps,
  note,
  onAutosaveNote,
}) {
  return (
    <div className="min-h-screen bg-slate-50 bg-hero-gradient px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-glow backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">FocusFlow</p>
            <h1 className="text-2xl font-bold">Smart Productivity Dashboard</h1>
            <p className="text-sm text-slate-500">
              Stay focused, ship faster, and keep your day under control.
            </p>
          </div>
          <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        </motion.header>

        <div className="grid gap-4 lg:grid-cols-2">
          <TaskManager {...taskProps} />
          <PomodoroTimer {...pomodoroProps} />
          <StatsDashboard {...statsProps} />
          <NotesSection initialValue={note} onAutosave={onAutosaveNote} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
