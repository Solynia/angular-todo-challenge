import { createFeature, createReducer, on } from '@ngrx/store';
import { TODO_FEATURE_KEY, todoActions } from './todo.actions';

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
  statusFilter: TodoStatus | undefined;
}

export const initialState: TodoState = {
  todoList: [],
  statusFilter: undefined,
};

const todoStatusToggler = {
  [TodoStatus.InProgress]: TodoStatus.Complete,
  [TodoStatus.Complete]: TodoStatus.InProgress,
};

const todoReducer = createReducer(
  initialState,
  on(todoActions.getToDoListSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
  })),
  on(todoActions.addToDoItem, (state, { name }) => {
    // id would be handled in the backend
    const ids = state.todoList.map((t) => t.id);
    const nextId = state.todoList.length ? Math.max(...ids) + 1 : 1;
    const newTodo: Todo = { id: nextId, name, status: TodoStatus.InProgress };
    return {
      ...state,
      todoList: [...state.todoList, newTodo],
    };
  }),
  on(todoActions.changeToDoStatus, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) =>
      el.id === todo.id ? { ...el, status: todoStatusToggler[el.status] } : el
    ),
  })),
  on(todoActions.changeToDoName, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) =>
      el.id === todo.id ? { ...el, name: todo.name } : el
    ),
  })),
  on(todoActions.changeStatusFilter, (state, { status }) => ({
    ...state,
    statusFilter: status,
  }))
);

export const todoFeature = createFeature({
  name: TODO_FEATURE_KEY,
  reducer: todoReducer,
});
