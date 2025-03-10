import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from './todo.reducer';

export const TODO_FEATURE_KEY = 'ToDo';

export const todoActions = createActionGroup({
  source: TODO_FEATURE_KEY,
  events: {
    'Get ToDo List': emptyProps(),
    'Get ToDo List Success': props<{ todoList: Todo[] }>(),
    'Get ToDo List Failure': props<{ error: any }>(),
    'Add ToDo Item': props<{ name: string }>(),
    'Change ToDo Name': props<{ todo: Todo }>(),
    'Change ToDo Status': props<{ todo: Todo }>(),
    'Remove ToDo Item': props<{ todo: Todo }>(),
  },
});
