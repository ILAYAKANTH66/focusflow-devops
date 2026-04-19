import { useEffect, useMemo, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { deleteTaskMock, fetchTasksMock, saveNoteMock, saveTaskMock } from "./services/mockApi";
import { BREAK_SECONDS, FOCUS_SECONDS, TASK_FILTERS } from "./utils/constants";

function App() {
  const [darkMode, setDarkMode] = useLocalStorage("focusflow:darkMode", false);
  const [tasks, setTasks] = useLocalStorage("focusflow:tasks", []);
  const [taskFilter, setTaskFilter] = useState(TASK_FILTERS.ALL);
  const [note, setNote] = useLocalStorage("focusflow:notes", "");

  const [isBreak, setIsBreak] = useState(false);
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS);
  const [focusMinutes, setFocusMinutes] = useLocalStorage("focusflow:focusMinutes", 0);

  useEffect(() => {
    fetchTasksMock(tasks).then((loadedTasks) => setTasks(loadedTasks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          if (!isBreak) {
            setFocusMinutes((minutes) => minutes + 25);
          }
          setIsBreak((previous) => !previous);
          return isBreak ? FOCUS_SECONDS : BREAK_SECONDS;
        }
        return value - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, isBreak, setFocusMinutes]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed && isToday(task.completedAt)).length,
    [tasks]
  );

  const priorityDistribution = useMemo(
    () =>
      tasks.reduce(
        (accumulator, task) => {
          accumulator[task.priority] += 1;
          return accumulator;
        },
        { High: 0, Medium: 0, Low: 0 }
      ),
    [tasks]
  );

  async function addTask(title, priority) {
    const nextTask = {
      id: crypto.randomUUID(),
      title,
      priority,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
    };
    await saveTaskMock(nextTask);
    setTasks((previous) => [nextTask, ...previous]);
  }

  async function removeTask(id) {
    await deleteTaskMock(id);
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  async function toggleTask(id) {
    const selected = tasks.find((task) => task.id === id);
    if (!selected) return;
    const nextTask = {
      ...selected,
      completed: !selected.completed,
      completedAt: !selected.completed ? Date.now() : null,
    };
    await saveTaskMock(nextTask);
    setTasks((previous) => previous.map((task) => (task.id === id ? nextTask : task)));
  }

  async function editTask(id, title) {
    const selected = tasks.find((task) => task.id === id);
    if (!selected) return;
    const nextTask = { ...selected, title };
    await saveTaskMock(nextTask);
    setTasks((previous) => previous.map((task) => (task.id === id ? nextTask : task)));
  }

  function startPauseTimer() {
    setRunning((previous) => !previous);
  }

  function resetTimer() {
    setRunning(false);
    setIsBreak(false);
    setSecondsLeft(FOCUS_SECONDS);
  }

  async function autosaveNote(nextNote) {
    setNote(nextNote);
    await saveNoteMock(nextNote);
  }

  return (
    <DashboardPage
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode((previous) => !previous)}
      taskProps={{
        tasks,
        filter: taskFilter,
        setFilter: setTaskFilter,
        onAddTask: addTask,
        onDeleteTask: removeTask,
        onToggleTask: toggleTask,
        onEditTask: editTask,
      }}
      pomodoroProps={{
        isBreak,
        running,
        secondsLeft,
        initialSeconds: isBreak ? BREAK_SECONDS : FOCUS_SECONDS,
        onStartPause: startPauseTimer,
        onReset: resetTimer,
      }}
      statsProps={{
        tasksCompletedToday: completedCount,
        focusMinutes,
        priorityDistribution,
      }}
      note={note}
      onAutosaveNote={autosaveNote}
    />
  );
}

function isToday(timestamp) {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export default App;
