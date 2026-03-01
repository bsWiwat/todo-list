import { Task, TASK_STATUS } from "@/models/task";

export default function Status({ tasks }: { tasks: Task[] }) {
  const all = tasks.length;

  const completed = tasks.filter(
    (t) => t.status_code === TASK_STATUS.COMPLETED,
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status_code === TASK_STATUS.IN_PROGRESS,
  ).length;

  const pending = tasks.filter(
    (t) => t.status_code === TASK_STATUS.PENDING,
  ).length;

  const overdue = tasks.filter((t) => {
    if (!t.due_date) return false;
    const due = new Date(t.due_date);
    const today = new Date();
    return due < today && t.status_code !== TASK_STATUS.COMPLETED;
  }).length;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* All */}
      <Card
        title="All"
        value={all}
        bg="bg-violet-100"
        hover="hover:bg-violet-200"
        text="text-violet-600"
      />

      {/* Completed */}
      <Card
        title="Completed"
        value={completed}
        bg="bg-green-100"
        hover="hover:bg-green-200"
        text="text-green-600"
      />

      {/* In Progress */}
      {/* <Card
        title="In Progress"
        value={inProgress}
        bg="bg-blue-100"
        hover="hover:bg-blue-200"
        text="text-blue-600"
      /> */}

      {/* Pending */}
      <Card
        title="Pending"
        value={pending}
        bg="bg-yellow-100"
        hover="hover:bg-yellow-200"
        text="text-yellow-600"
      />

      {/* Overdue */}
      <Card
        title="Overdue"
        value={overdue}
        bg="bg-red-100"
        hover="hover:bg-red-200"
        text="text-red-600"
      />
    </div>
  );
}

function Card({
  title,
  value,
  bg,
  hover,
  text,
}: {
  title: string;
  value: number;
  bg: string;
  hover: string;
  text: string;
}) {
  return (
    <div className={`${bg} ${hover} p-4 rounded-xl shadow-sm transition`}>
      <h2 className="text-xs font-semibold mb-2 text-slate-600">{title}</h2>
      <p className={`text-2xl font-bold ${text}`}>{value}</p>
    </div>
  );
}

