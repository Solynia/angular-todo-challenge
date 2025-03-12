import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todo, TodoPriority, TodoStatus } from './todo.interface';

const todos: Todo[] = [
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
  {
    id: 4,
    name: 'My fourth todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.low,
  },
  {
    id: 5,
    name: 'My fifth todo',
    status: TodoStatus.Complete,
    priority: TodoPriority.high,
  },
  {
    id: 6,
    name: 'My sixth todo',
    status: TodoStatus.Complete,
    priority: TodoPriority.medium,
  },
  {
    id: 7,
    name: 'My seventh todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.medium,
  },
];

@Injectable({ providedIn: 'root' })
export class TodoService {
  getAll() {
    return of([]);
  }
}
