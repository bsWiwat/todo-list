"use client";
import { Task, TASK_STATUS, priorityColor, priorityLabel } from "@/models/task";
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

type SectionProps = {
  title: string;
  data: Task[];
  name: string;
  openSection: string | null;
  setOpenSection: (name: string | null) => void;
  onToggle: (task: Task) => void;
};

function Section({
  title,
  data,
  name,
  openSection,
  setOpenSection,
  onToggle,
}: SectionProps) {
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
                    <button onClick={() => onToggle(task)}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 hover:text-violet-600" />
                      )}
                    </button>

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

export default function Upcoming({
  tasks = [],
  onToggle,
}: {
  tasks?: Task[];
  onToggle: (task: Task) => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>("today");

  const formatDateOnly = (date: Date) => date.toISOString().split("T")[0];

  const todayStr = formatDateOnly(new Date());

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = formatDateOnly(tomorrowDate);

  const todayTasks = tasks.filter(
    (t) => t.due_date && t.due_date.split("T")[0] === todayStr,
  );

  const tomorrowTasks = tasks.filter(
    (t) => t.due_date && t.due_date.split("T")[0] === tomorrowStr,
  );

  const afterTasks = tasks.filter((t) => {
    if (!t.due_date) return false;
    return t.due_date.split("T")[0] > tomorrowStr;
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
        onToggle={onToggle}
      />

      <Section
        title="Tomorrow"
        data={tomorrowTasks}
        name="tomorrow"
        openSection={openSection}
        setOpenSection={setOpenSection}
        onToggle={onToggle}
      />

      <Section
        title="After"
        data={afterTasks}
        name="after"
        openSection={openSection}
        setOpenSection={setOpenSection}
        onToggle={onToggle}
      />
    </div>
  );
}

