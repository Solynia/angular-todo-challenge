import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo, TodoPriority, TodoStatus } from './todo.reducer';

export const TODO_FEATURE_KEY = 'ToDo';

export const todoActions = createActionGroup({
  source: TODO_FEATURE_KEY,
  events: {
    'Get ToDo List': emptyProps(), //getToDoList
    'Get ToDo List Success': props<{ todoList: Todo[] }>(), //getToDoListSuccess
    'Get ToDo List Failure': props<{ error: any }>(), //getToDoListFailure
    'Add ToDo Item': props<{ name: string; priority: TodoPriority }>(), //addToDoItem
    'Change ToDo Name': props<{ todo: Todo }>(), //changeToDoName
    'Change ToDo Status': props<{ todo: Todo }>(), //changeToDoStatus
    'Remove ToDo Item': props<{ todo: Todo }>(), //removeToDoItem
    'Change Status Filter': props<{ status: TodoStatus | undefined }>(), //changeStatusFilter
    'Open ToDo Edit': props<{ todo: Todo }>(), //openToDoEdit
  },
});
