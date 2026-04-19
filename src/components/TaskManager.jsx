import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PRIORITIES, TASK_FILTERS } from "../utils/constants";

function TaskManager({
  tasks,
  filter,
  setFilter,
  onAddTask,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}) {
  const [draft, setDraft] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const filteredTasks = useMemo(() => {
    if (filter === TASK_FILTERS.COMPLETED) return tasks.filter((task) => task.completed);
    if (filter === TASK_FILTERS.PENDING) return tasks.filter((task) => !task.completed);
    return tasks;
  }, [tasks, filter]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    onAddTask(draft.trim(), priority);
    setDraft("");
    setPriority("Medium");
  }

  function startEditing(task) {
    setEditingId(task.id);
    setEditingText(task.title);
  }

  function saveEdit(taskId) {
    if (!editingText.trim()) return;
    onEditTask(taskId, editingText.trim());
    setEditingId(null);
    setEditingText("");
  }

  const priorityColor = {
    High: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  };

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Smart Task Manager</h2>
        <div className="flex gap-2 rounded-xl bg-slate-100 p-1 text-sm dark:bg-slate-800">
          {Object.values(TASK_FILTERS).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-lg px-3 py-1 capitalize transition ${
                filter === value
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                  : "text-slate-500 dark:text-slate-300"
              }`}
              type="button"
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add your next high-impact task..."
          className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
        />
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          {PRIORITIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Add Task
        </button>
      </form>

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="h-4 w-4 cursor-pointer accent-sky-500"
            />
            {editingId === task.id ? (
              <input
                value={editingText}
                onChange={(event) => setEditingText(event.target.value)}
                className="flex-1 rounded-md border border-slate-300 px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
              />
            ) : (
              <p
                className={`flex-1 text-sm ${
                  task.completed ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {task.title}
              </p>
            )}
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityColor[task.priority]}`}>
              {task.priority}
            </span>
            {editingId === task.id ? (
              <button
                type="button"
                onClick={() => saveEdit(task.id)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700"
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() => startEditing(task)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-300"
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={() => onDeleteTask(task.id)}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600"
            >
              Delete
            </button>
          </motion.div>
        ))}
        {!filteredTasks.length && (
          <p className="rounded-xl border border-dashed border-slate-300 p-3 text-center text-sm text-slate-500 dark:border-slate-700">
            No tasks in this view yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default TaskManager;
