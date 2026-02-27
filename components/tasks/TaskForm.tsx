"use client";

import { Task } from "@/models/task";
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

  return (
    <form className="bg-white p-6  shadow-sm  space-y-5">
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

