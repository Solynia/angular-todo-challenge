import { createFeature, createReducer, on } from '@ngrx/store';
import { todoActions } from './todo.actions';

export const TODO_FEATURE_KEY = 'ToDo';

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
}

export interface TodoState {
  todoList: Todo[];
}

export const initialState: TodoState = {
  todoList: [],
};

const todoReducer = createReducer(
  initialState,
  on(todoActions.getToDoListSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
  })),
  on(todoActions.changeToDoName, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) =>
      el.id === todo.id ? { ...el, name: todo.name } : el
    ),
  }))
);

export const todoFeature = createFeature({
  name: TODO_FEATURE_KEY,
  reducer: todoReducer,
});
