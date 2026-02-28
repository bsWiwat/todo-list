"use client";
import { useEffect, useState } from "react";
import Status from "@/components/tasks/Status";
import Calendar from "@/components/dashboard/Calendar";
import { Plus } from "lucide-react";
import { Task } from "@/models/task";
import Upcoming from "@/components/dashboard/Upcoming";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";

export default function Home() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasksList(data);
    };

    fetchTasks();
  }, []);

  const handleAddTask = (task: Task) => {
    setTasksList((prev) => [task, ...prev]);
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
          <button
            className="bg-violet-600 hover:bg-violet-700 shadow-lg text-white px-4 py-2 rounded flex items-center"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="text-white" />
            New Task
          </button>
        </div>

        <div>
          <Status tasks={tasksList} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <Calendar tasks={tasksList} />
          </div>

          <div>
            <Upcoming tasks={tasksList} />
          </div>
        </div>

        <div className="p-4 mb-4 mt-8">
          <TaskFilters />
          <div className="mt-4">
            {tasksList.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              <TaskForm
                onSubmit={(task) => {
                  handleAddTask(task);
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

