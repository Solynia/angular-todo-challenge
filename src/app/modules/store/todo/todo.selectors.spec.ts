import { TodoPriority, TodoState, TodoStatus } from './todo.reducer';
import {
  getAllSortedTodos,
  getAllTodos,
  getFilteredTodos,
  getStatusFilter,
  getTodoCounts,
} from './todo.selectors';

describe('Todo Selectors', () => {
  const todo1 = {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete,
    priority: TodoPriority.low,
  };
  const todo2 = {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.medium,
  };
  const todo3 = {
    id: 3,
    name: 'My third todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.high,
  };
  const todoList: TodoState['todoList'] = [todo1, todo2, todo3];

  it('should select the status filter', () => {
    const statusFilter = TodoStatus.Complete;

    const result = getStatusFilter.projector({ todoList: [], statusFilter });

    expect(result).toEqual(statusFilter);
  });

  it('should select all todos without regard for priority', () => {
    const result = getAllTodos.projector({ todoList, statusFilter: undefined });

    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual(todo1.id);
    expect(result[1].id).toEqual(todo2.id);
    expect(result[2].id).toEqual(todo3.id);
  });

  it('should select all todos sorted by priority', () => {
    const result = getAllSortedTodos.projector(todoList);

    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual(todo3.id);
    expect(result[1].id).toEqual(todo2.id);
    expect(result[2].id).toEqual(todo1.id);
  });

  it('should select in progress todos', () => {
    const result = getFilteredTodos.projector(
      getAllSortedTodos.projector(todoList),
      TodoStatus.InProgress
    );

    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(todo2.id);
  });

  it('should select completed todos', () => {
    const result = getFilteredTodos.projector(
      getAllSortedTodos.projector(todoList),
      TodoStatus.Complete
    );

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(todo1.id);
  });

  it('should select all todos when filter is not set', () => {
    const result = getFilteredTodos.projector(
      getAllSortedTodos.projector(todoList),
      undefined
    );

    expect(result.length).toEqual(3);
    expect(result[1].id).toEqual(todo2.id);
  });

  it('should sort filtered todos by priority', () => {
    const result = getFilteredTodos.projector(
      getAllSortedTodos.projector(todoList),
      undefined
    );

    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual(todo3.id);
    expect(result[1].id).toEqual(todo2.id);
    expect(result[2].id).toEqual(todo1.id);
  });

  it('should return todo count per status', () => {
    const result = getTodoCounts.projector(todoList);

    expect(result.total).toEqual(3);
    expect(result[TodoStatus.Complete]).toEqual(1);
    expect(result[TodoStatus.InProgress]).toEqual(2);
  });

  it('should return safe todo count per status', () => {
    const result = getTodoCounts.projector([]);

    expect(result.total).toEqual(0);
    expect(result[TodoStatus.Complete]).toEqual(0);
    expect(result[TodoStatus.InProgress]).toEqual(0);
  });
});
