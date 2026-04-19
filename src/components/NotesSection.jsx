import { useEffect, useState } from "react";

function NotesSection({ initialValue, onAutosave }) {
  const [note, setNote] = useState(initialValue || "");
  const [saved, setSaved] = useState("Saved");

  useEffect(() => {
    const timer = setTimeout(async () => {
      await onAutosave(note);
      setSaved("Saved");
    }, 500);
    return () => clearTimeout(timer);
  }, [note, onAutosave]);

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quick Notes</h2>
        <span className="text-xs text-slate-500">{saved}</span>
      </div>
      <textarea
        value={note}
        onChange={(event) => {
          setSaved("Saving...");
          setNote(event.target.value);
        }}
        placeholder="Capture ideas, blockers, and next actions..."
        className="h-40 w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none ring-sky-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
      />
    </section>
  );
}

export default NotesSection;
