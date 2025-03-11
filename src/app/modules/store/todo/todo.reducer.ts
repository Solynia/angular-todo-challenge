import { createFeature, createReducer, on } from '@ngrx/store';
import { TODO_FEATURE_KEY, todoActions } from './todo.actions';

export const PAGE_SIZE = 5;

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export enum TodoPriority {
  low = 'LOW',
  medium = 'MEDIUM',
  high = 'HIGH',
}

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
  priority?: TodoPriority;
}

export interface TodoState {
  todoList: Todo[];
  statusFilter: TodoStatus | undefined;
  pageIndex: number;
}

export const initialState: TodoState = {
  todoList: [],
  statusFilter: undefined,
  pageIndex: 0,
};

const todoStatusToggler = {
  [TodoStatus.InProgress]: TodoStatus.Complete,
  [TodoStatus.Complete]: TodoStatus.InProgress,
};

const todoReducer = createReducer(
  initialState,
  on(todoActions.getToDoListSuccess, (state, { todoList }) => ({
    ...state,
    pageIndex: 0,
    todoList,
  })),
  on(todoActions.addToDoItem, (state, { name, priority }) => {
    // id would be handled in the backend
    const ids = state.todoList.map((t) => t.id);
    const nextId = state.todoList.length ? Math.max(...ids) + 1 : 1;
    const newTodo: Todo = {
      id: nextId,
      name,
      status: TodoStatus.InProgress,
      priority,
    };
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
  on(todoActions.removeToDoItem, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.filter((el) => el.id !== todo.id),
  })),
  on(todoActions.changeStatusFilter, (state, { status }) => ({
    ...state,
    statusFilter: status,
    pageIndex: 0,
  })),
  on(todoActions.changePage, (state, { index }) => {
    const totalPages = Math.ceil(state.todoList.length / PAGE_SIZE);
    return {
      ...state,
      pageIndex: index >= totalPages ? totalPages - 1 : index,
    };
  })
);

export const todoFeature = createFeature({
  name: TODO_FEATURE_KEY,
  reducer: todoReducer,
});
