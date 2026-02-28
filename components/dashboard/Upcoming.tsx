"use client";
import { Task, TASK_STATUS, TASK_PRIORITY } from "@/models/task";
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

type SectionProps = {
  title: string;
  data: Task[];
  name: string;
  openSection: string | null;
  setOpenSection: (name: string | null) => void;
};

function Section({
  title,
  data,
  name,
  openSection,
  setOpenSection,
}: SectionProps) {
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
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setOpenSection(openSection === name ? null : name)}
        className="w-full flex justify-between items-center font-semibold py-2"
      >
        {title}
        <span className="text-sm text-gray-500">{data.length}</span>
      </button>

      {openSection === name && (
        <div className="space-y-2 mt-2">
          {data.length === 0 ? (
            <p className="text-sm text-gray-400">No tasks</p>
          ) : (
            data.map((task) => {
              const isCompleted = task.status_code === TASK_STATUS.COMPLETED;

              return (
                <div
                  key={task.id}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm"
                >
                  <div className="flex items-center max-w-[70%] truncate">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    )}

                    <span
                      className={`truncate ${
                        isCompleted
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      priorityColor[task.priority_code]
                    }`}
                  >
                    {priorityLabel[task.priority_code]}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default function Upcoming({ tasks = [] }: { tasks?: Task[] }) {
  const [openSection, setOpenSection] = useState<string | null>("today");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.toDateString() === d2.toDateString();

  const todayTasks = tasks.filter(
    (t) => t.due_date && isSameDay(new Date(t.due_date), today),
  );

  const tomorrowTasks = tasks.filter(
    (t) => t.due_date && isSameDay(new Date(t.due_date), tomorrow),
  );

  const afterTasks = tasks.filter((t) => {
    if (!t.due_date) return false;
    return new Date(t.due_date) > tomorrow;
  });

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Upcoming</h2>

      <Section
        title="Today"
        data={todayTasks}
        name="today"
        openSection={openSection}
        setOpenSection={setOpenSection}
      />

      <Section
        title="Tomorrow"
        data={tomorrowTasks}
        name="tomorrow"
        openSection={openSection}
        setOpenSection={setOpenSection}
      />

      <Section
        title="After"
        data={afterTasks}
        name="after"
        openSection={openSection}
        setOpenSection={setOpenSection}
      />
    </div>
  );
}

