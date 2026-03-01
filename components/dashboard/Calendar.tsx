"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { priorityColor, Task } from "@/models/task";

export default function Calendar({ tasks }: { tasks: Task[] }) {
  const events = tasks
    .filter((task) => task.due_date)
    .map((task) => ({
      id: task.id,
      title: task.title,
      date: task.due_date?.split("T")[0],
      backgroundColor: priorityColor[task.priority_code],
    }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
}

