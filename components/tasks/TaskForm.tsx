"use client";

import { Task, TASK_PRIORITY, TASK_STATUS } from "@/models/task";
import { useState } from "react";
type Props = {
  onSubmit: (task: Task) => void;
};

export default function TaskForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    category: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      user_id: "",
      title: form.title,
      description: form.desc,
      status_code: TASK_STATUS.PENDING,
      priority_code:
        form.priority === "low"
          ? TASK_PRIORITY.LOW
          : form.priority === "medium"
            ? TASK_PRIORITY.MEDIUM
            : TASK_PRIORITY.HIGH,
      category: form.category,
      due_date: form.dueDate,
    };

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const newTask = await res.json();
    onSubmit(newTask[0]);
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 space-y-5">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          className="w-full px-3 py-2 shadow-sm rounded-lg"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Task description"
          rows={3}
          className="w-full px-3 py-2 shadow-sm rounded-lg"
        />
      </div>

      {/* Category | Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 shadow-sm rounded-lg"
          >
            <option value="">Select category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 shadow-sm rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="datetime-local"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full px-3 py-2 shadow-sm rounded-lg"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Create Task
      </button>
    </form>
  );
}

