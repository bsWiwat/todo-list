export type Task = {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: "low" | "medium" | "high";
  status?: "pending" | "on-time" | "completed" | "overdue";
  dueDate?: Date;
};

