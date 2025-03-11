import { Todo, TodoStatus } from './todo.reducer';

//TODO replace with a service to take advantage of DI
export const todos: Todo[] = [
  {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete,
  },
  {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress,
  },
];
