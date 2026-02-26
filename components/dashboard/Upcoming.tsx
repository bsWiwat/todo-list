"use client";
import { Task } from "@/models/task";
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
  const priorityColor = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
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
            data.map((task) => (
              <div
                key={task.id}
                className="flex justify-between bg-gray-50 p-2 rounded-lg text-sm"
              >
                <div
                  className={`truncate max-w-[70%] ${
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {task.title}
                </div>
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
            ))
          )}

          {data.length > 5 && (
            <div className="flex justify-end">
              <button className="text-xs text-blue-500 hover:underline mt-1">
                Show more ▼
              </button>
            </div>
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

  const todayTasks = tasks.filter((t) =>
    isSameDay(new Date(t.dueDate || new Date()), today),
  );

  const tomorrowTasks = tasks.filter((t) =>
    isSameDay(new Date(t.dueDate || new Date()), tomorrow),
  );

  const afterTasks = tasks.filter((t) => {
    const due = new Date(t.dueDate || new Date());
    return due > tomorrow;
  });

  return (
    <div className="rounded-xl bg-card text-card-foreground p-6 border-0 shadow-sm">
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

