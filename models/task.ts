export const TASK_STATUS = {
  PENDING: "101001",
  IN_PROGRESS: "101002",
  COMPLETED: "101003",
} as const;
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export const TASK_PRIORITY = {
  LOW: "102001",
  MEDIUM: "102002",
  HIGH: "102003",
} as const;
export type TaskPriority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status_code: TaskStatus;
  priority_code: TaskPriority;
  category: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

