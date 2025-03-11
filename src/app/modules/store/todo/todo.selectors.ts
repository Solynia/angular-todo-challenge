import { createSelector } from '@ngrx/store';
import { todoFeature } from './todo.reducer';

export const {
  selectTodoList: getAllTodos,
  selectStatusFilter: getStatusFilter,
} = todoFeature;

export const getFilteredTodos = createSelector(
  getAllTodos,
  getStatusFilter,
  (todos, statusFilter) => {
    if (statusFilter === undefined) {
      return todos;
    }
    return todos.filter((todo) => todo.status === statusFilter);
  }
);
