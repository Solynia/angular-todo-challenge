import { createSelector } from '@ngrx/store';
import { todoFeature, TodoPriority } from './todo.reducer';

export const {
  selectTodoList: getAllTodos,
  selectStatusFilter: getStatusFilter,
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
