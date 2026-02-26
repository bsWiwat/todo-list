import Status from "@/components/tasks/Status";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold  text-violet-600">
              To-Do your tasks
            </h1>
            <p className="text-slate-500 mt-1">
              manage your tasks and boost your productivity.
            </p>
          </div>
          <button className="bg-violet-600 hover:bg-violet-700 shadow-lg text-white px-4 py-2 rounded flex items-center">
            <Plus className="text-white" />
            เพิ่มงานใหม่
          </button>
        </div>

        <div>
          <Status tasks={[]} />
        </div>
      </div>
    </>
  );
}

