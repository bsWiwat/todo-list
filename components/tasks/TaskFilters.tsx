import { Task, TaskPriority, TaskStatus } from "@/models/task";
import { ArrowUp, CircleX, Search } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  setTasks: (tasks: Task[]) => void;
};

export default function TaskFilters({ setTasks }: Props) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "">("");
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | "">(
    "",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  useEffect(() => {
    const fetchTasks = async () => {
      const params = new URLSearchParams();

      if (searchText) params.append("search", searchText);
      if (selectedStatus) params.append("status", selectedStatus);
      if (selectedPriority) params.append("priority", selectedPriority);
      if (selectedCategory) params.append("category", selectedCategory);
      if (sortOrder) params.append("sort", sortOrder);

      const res = await fetch(`/api/tasks?${params}`);
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, [
    searchText,
    selectedStatus,
    selectedPriority,
    selectedCategory,
    sortOrder,
    setTasks,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
      <div className="lg:col-span-5 relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search task..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm"
        />
      </div>

      <div className="lg:col-span-3 flex gap-2">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-3 py-2 rounded-lg shadow-sm bg-gray-100 hover:bg-gray-200"
        >
          <ArrowUp
            className={`w-5 h-5 ${sortOrder === "desc" ? "rotate-180" : ""}`}
          />
        </button>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as TaskStatus | "")}
          className="w-full px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="">All Status</option>
          <option value="101001">Pending</option>
          {/* <option value="101002">In Progress</option> */}
          <option value="101003">Completed</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2  rounded-lg shadow-sm"
        >
          <option value="">All Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
        </select>

        <select
          value={selectedPriority}
          onChange={(e) =>
            setSelectedPriority(e.target.value as TaskPriority | "")
          }
          className="w-full px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="">All Priority</option>
          <option value="102003">High</option>
          <option value="102002">Medium</option>
          <option value="102001">Low</option>
        </select>

        <button
          onClick={() => {
            setSearchText("");
            setSelectedCategory("");
            setSelectedStatus("");
            setSelectedPriority("");
            setSortOrder("asc");
          }}
        >
          <CircleX className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );
}

