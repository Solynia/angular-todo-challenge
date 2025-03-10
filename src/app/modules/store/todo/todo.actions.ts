import { createAction, props } from '@ngrx/store';
import { createFailureAction, createSuccessAction } from '../action-utils';
import { Todo } from './todo.reducer'

export const getTodos = createAction('[ToDo] Get ToDo List');
export const getTodosSuccess = createSuccessAction(
  getTodos,
  props<{ todoList: Todo[]}>()
);
export const getTodosFailure = createFailureAction(getTodos);

export const addTodo = createAction(
  '[ToDo] Add ToDo Item',
  props<{ name: string}>()
  );

export const changeTodoName = createAction(
  '[ToDo] Change ToDo Name',
  props<{ todo: Todo}>()
  );

export const changeTodoStatus = createAction(
  '[ToDo] Change ToDo Status',
  props<{ todo: Todo}>()
  );

export const removeTodo = createAction(
  '[ToDo] Remove ToDo Item',
  props<{ todo: Todo}>()
  );
