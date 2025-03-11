import { TodoState, TodoStatus } from './todo.reducer';
import {
  getAllTodos,
  getFilteredTodos,
  getStatusFilter,
} from './todo.selectors';

describe('Todo Selectors', () => {
  const todo1 = {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete,
  };
  const todo2 = {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress,
  };
  const todoList: TodoState['todoList'] = [todo1, todo2];

  it('should select the status filter', () => {
    const statusFilter = TodoStatus.Complete;

    const result = getStatusFilter.projector({ todoList: [], statusFilter });

    expect(result).toEqual(statusFilter);
  });

  it('should select all todos', () => {
    const result = getAllTodos.projector({ todoList, statusFilter: undefined });

    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(todo2.id);
  });

  it('should select in progress todos', () => {
    const result = getFilteredTodos.projector(todoList, TodoStatus.InProgress);

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(todo2.id);
  });

  it('should select completed todos', () => {
    const result = getFilteredTodos.projector(todoList, TodoStatus.Complete);

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(todo1.id);
  });

  it('should select all todos when filter is not set', () => {
    const result = getFilteredTodos.projector(todoList, undefined);

    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(todo2.id);
  });
});
