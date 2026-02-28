import { CheckCircle2, Circle, Calendar } from "lucide-react";
import { Task, TASK_STATUS, TASK_PRIORITY } from "@/models/task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const isCompleted = task.status_code === TASK_STATUS.COMPLETED;

  const isOverdue =
    task.due_date && new Date(task.due_date) < new Date() && !isCompleted;

  const priorityColor: Record<string, string> = {
    [TASK_PRIORITY.HIGH]: "bg-red-100 text-red-600",
    [TASK_PRIORITY.MEDIUM]: "bg-yellow-100 text-yellow-600",
    [TASK_PRIORITY.LOW]: "bg-green-100 text-green-600",
  };

  const priorityLabel: Record<string, string> = {
    [TASK_PRIORITY.HIGH]: "High",
    [TASK_PRIORITY.MEDIUM]: "Medium",
    [TASK_PRIORITY.LOW]: "Low",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition hover:-translate-y-1 mb-2">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3
            className={`text-sm font-semibold ${
              isCompleted ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>

          {task.category && (
            <p className="text-xs text-gray-500 mt-1">{task.category}</p>
          )}
        </div>

        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </div>

      <div className="flex justify-between items-center">
        {task.due_date && (
          <div
            className={`flex items-center text-xs ${
              isOverdue ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(task.due_date).toLocaleDateString()}
          </div>
        )}

        {task.priority_code && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priorityColor[task.priority_code]
            }`}
          >
            {priorityLabel[task.priority_code]}
          </span>
        )}
      </div>
    </div>
  );
}

