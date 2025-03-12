export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export enum TodoPriority {
  low = 'LOW',
  medium = 'MEDIUM',
  high = 'HIGH',
}

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
  priority?: TodoPriority;
}
