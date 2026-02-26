import Status from "@/components/tasks/Status";
import Calendar from "@/components/dashboard/Calendar";
import { Plus } from "lucide-react";
import { Task } from "@/models/task";
import Upcoming from "@/components/dashboard/Upcoming";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskCard from "@/components/tasks/TaskCard";

export default function Home() {
  const tasks: Task[] = [];
  tasks[0] = {
    id: "1",
    title: "Design dashboard layout lomem ipsum dolor sit amet consectetur adipiscing elit",
    category: "Work",
    status: "pending",
    dueDate: new Date(),
    priority: "high",
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold  text-violet-600">
              To-Do your tasks
            </h1>
            <p className="text-slate-500 mt-1">
              manage your tasks and boost your productivity.
            </p>
          </div>
          <button className="bg-violet-600 hover:bg-violet-700 shadow-lg text-white px-4 py-2 rounded flex items-center">
            <Plus className="text-white" />
            เพิ่มงานใหม่
          </button>
        </div>

        <div>
          <Status tasks={[]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <Calendar />
          </div>

          <div>
            <Upcoming tasks={tasks} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 mt-8">
          <TaskFilters />
          <div className="mt-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

