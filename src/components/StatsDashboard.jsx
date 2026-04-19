import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function StatsDashboard({ tasksCompletedToday, focusMinutes, priorityDistribution }) {
  const chartData = [
    { name: "High", count: priorityDistribution.High || 0 },
    { name: "Medium", count: priorityDistribution.Medium || 0 },
    { name: "Low", count: priorityDistribution.Low || 0 },
  ];

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <h2 className="mb-4 text-xl font-semibold">Productivity Stats</h2>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
          <p className="text-xs uppercase text-slate-500">Completed Today</p>
          <p className="text-2xl font-bold">{tasksCompletedToday}</p>
        </div>
        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
          <p className="text-xs uppercase text-slate-500">Focus Time</p>
          <p className="text-2xl font-bold">{focusMinutes} min</p>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.2} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default StatsDashboard;
