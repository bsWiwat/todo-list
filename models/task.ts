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

const priorityColor: Record<TaskPriority, string> = {
  [TASK_PRIORITY.HIGH]: "#ef4444",
  [TASK_PRIORITY.MEDIUM]: "#f59e0b",
  [TASK_PRIORITY.LOW]: "#22c55e",
};
const priorityLabel: Record<string, string> = {
  [TASK_PRIORITY.HIGH]: "High",
  [TASK_PRIORITY.MEDIUM]: "Medium",
  [TASK_PRIORITY.LOW]: "Low",
};
export { priorityColor, priorityLabel };

export type Task = {
  id: string;
  user_id?: string;
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

