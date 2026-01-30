export type TodoStatus = "in-progress" | "completed";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  completed: boolean;
  created: Date;
  endDate: Date | null | string;
}
