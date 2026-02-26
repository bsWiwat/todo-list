import { Search } from "lucide-react";

export default function TaskFilters() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
      <div className="lg:col-span-5 relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search task..."
          className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm"
        />
      </div>

      <div className="lg:col-span-3 flex gap-2">
        <select className="w-full px-3 py-2  rounded-lg shadow-sm">
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>

        <select className="w-full px-3 py-2  rounded-lg shadow-sm">
          <option>All Category</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Shopping</option>
        </select>

        <select className="w-full px-3 py-2  rounded-lg shadow-sm">
          <option>All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
    </div>
  );
}

