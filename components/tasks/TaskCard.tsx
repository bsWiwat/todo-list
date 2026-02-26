import { CheckCircle2, Circle, Calendar } from "lucide-react";
import { Task } from "@/models/task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const isOverdue = task.status === "overdue";

  const priorityColor = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3
            className={`text-sm font-semibold ${
              task.status === "completed"
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>

          {task.category && (
            <p className="text-xs text-gray-500 mt-1">{task.category}</p>
          )}
        </div>

        {task.status === "completed" ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </div>

      <div className="flex justify-between items-center">
        {task.dueDate && (
          <div
            className={`flex items-center text-xs ${
              isOverdue ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}

        {task.priority && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priorityColor[task.priority]
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>
    </div>
  );
}

