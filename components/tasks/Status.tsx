import { Task } from "@/models/task";

export default function Status({ tasks }: { tasks: Task[] }) {
  const all = tasks.length || 0;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = all - completed;
  const overdue = tasks.filter((t) => t.status === "overdue").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        className={`bg-blue-100 p-4 rounded-lg shadow-sm hover:bg-blue-200 transition`}
      >
        <h2 className="text-xs font-semibold mb-2">All</h2>
        <p className={`text-xl font-semibold text-blue-600`}>{all}</p>
      </div>

      <div
        className={`bg-green-100 p-4 rounded-lg shadow-sm hover:bg-green-200 transition`}
      >
        <h2 className="text-xs font-semibold mb-2">Completed</h2>
        <p className={`text-xl font-semibold text-green-600`}>{completed}</p>
      </div>

      <div
        className={`bg-yellow-100 p-4 rounded-lg shadow-sm hover:bg-yellow-200 transition`}
      >
        <h2 className="text-xs font-semibold mb-2">Pending</h2>
        <p className={`text-xl font-semibold text-yellow-600`}>{pending}</p>
      </div>

      <div
        className={`bg-red-100 p-4 rounded-lg shadow-sm hover:bg-red-200 transition`}
      >
        <h2 className="text-xs font-semibold mb-2">Overdue</h2>
        <p className={`text-xl font-semibold text-red-600`}>{overdue}</p>
      </div>
    </div>
  );
}

