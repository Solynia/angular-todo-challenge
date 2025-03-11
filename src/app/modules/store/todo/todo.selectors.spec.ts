import { TodoState, TodoStatus } from './todo.reducer';
import {
  getAllTodos,
  getFilteredTodos,
  getStatusFilter,
} from './todo.selectors';

describe('Todo Selectors', () => {
  const todoList: TodoState['todoList'] = [
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

  it('should select the status filter', () => {
    const result = getStatusFilter.projector({
      todoList: [],
      statusFilter: TodoStatus.Complete,
    });
    expect(result).toEqual(TodoStatus.Complete);
  });

  it('should select all todos', () => {
    const result = getAllTodos.projector({ todoList, statusFilter: undefined });
    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(2);
  });

  it('should select in progress todos', () => {
    const result = getFilteredTodos.projector(todoList, TodoStatus.InProgress);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(2);
  });

  it('should select completed todos', () => {
    const result = getFilteredTodos.projector(todoList, TodoStatus.Complete);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });

  it('should select all todos when filter is not set', () => {
    const result = getFilteredTodos.projector(todoList, undefined);
    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(2);
  });
});
