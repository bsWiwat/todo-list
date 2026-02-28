"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Task, TASK_PRIORITY, TaskPriority } from "@/models/task";

const priorityColorMap: Record<TaskPriority, string> = {
  [TASK_PRIORITY.HIGH]: "#ef4444",
  [TASK_PRIORITY.MEDIUM]: "#f59e0b",
  [TASK_PRIORITY.LOW]: "#22c55e",
};

export default function Calendar({ tasks }: { tasks: Task[] }) {
  const events = tasks
    .filter((task) => task.due_date)
    .map((task) => ({
      id: task.id,
      title: task.title,
      date: task.due_date?.split("T")[0],
      backgroundColor: priorityColorMap[task.priority_code],
    }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
}

