import { createSelector } from '@ngrx/store';
import { TodoPriority, TodoStatus } from '../../../services/todo.interface';
import { PAGE_SIZE, todoFeature } from './todo.reducer';

export const {
  selectTodoList: getAllTodos,
  selectStatusFilter: getStatusFilter,
  selectPageIndex: getPageIndex,
} = todoFeature;

const priorityConverter = {
  [TodoPriority.high]: 1,
  [TodoPriority.medium]: 2,
  [TodoPriority.low]: 3,
};

export const getAllSortedTodos = createSelector(getAllTodos, (todos) => {
  // create a shallow copy of the array to be allowed to mutate the state
  return [...todos].sort(
    (a, b) =>
      priorityConverter[a.priority ?? TodoPriority.medium] -
      priorityConverter[b.priority ?? TodoPriority.medium]
  );
});

export const getFilteredTodos = createSelector(
  getAllSortedTodos,
  getStatusFilter,
  (todos, statusFilter) => {
    if (statusFilter === undefined) {
      return todos;
    }
    return todos.filter((todo) => todo.status === statusFilter);
  }
);

export const getPaginatedTodos = createSelector(
  getFilteredTodos,
  getPageIndex,
  (todos, pageIndex) => {
    const startIndex = pageIndex * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, todos.length);
    return {
      pageIndex,
      pageSize: PAGE_SIZE,
      items: todos.slice(startIndex, endIndex),
    };
  }
);

export const getTodoCounts = createSelector(getAllTodos, (todos) => {
  return {
    total: todos.length,
    [TodoStatus.Complete]: todos.filter(
      (todo) => todo.status === TodoStatus.Complete
    ).length,
    [TodoStatus.InProgress]: todos.filter(
      (todo) => todo.status === TodoStatus.InProgress
    ).length,
  };
});
