import { motion } from "framer-motion";

function PomodoroTimer({ isBreak, secondsLeft, initialSeconds, running, onStartPause, onReset }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = (initialSeconds - secondsLeft) / initialSeconds;
  const offset = circumference * (1 - progress);
  const minuteLabel = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secondLabel = String(secondsLeft % 60).padStart(2, "0");

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <h2 className="mb-4 text-xl font-semibold">Pomodoro Timer</h2>

      <div className="mx-auto mb-4 flex w-fit items-center justify-center rounded-full bg-slate-100 p-4 dark:bg-slate-800">
        <div className="relative h-28 w-28">
          <svg className="h-full w-full -rotate-90">
            <circle cx="56" cy="56" r={radius} strokeWidth="8" className="fill-none stroke-slate-300 dark:stroke-slate-700" />
            <motion.circle
              cx="56"
              cy="56"
              r={radius}
              strokeWidth="8"
              strokeLinecap="round"
              className="fill-none stroke-sky-500"
              style={{ strokeDasharray: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {isBreak ? "Break" : "Focus"}
            </p>
            <p className="text-lg font-bold">{minuteLabel}:{secondLabel}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={onStartPause}
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

export default PomodoroTimer;
