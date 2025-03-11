import { Todo, TodoPriority, TodoStatus } from './todo.reducer';

//TODO replace with a service to take advantage of DI
export const todos: Todo[] = [
  {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete,
    priority: TodoPriority.low,
  },
  {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.medium,
  },
  {
    id: 3,
    name: 'My third todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.high,
  },
];
