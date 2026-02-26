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
  return (
    <div className="border-b pb-3">
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
              <div key={task.id} className="bg-gray-50 p-2 rounded-lg text-sm">
                {task.title}
              </div>
            ))
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

