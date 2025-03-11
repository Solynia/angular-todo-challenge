import { todoActions } from './todo.actions';
import {
  initialState,
  Todo,
  todoFeature,
  TodoState,
  TodoStatus,
} from './todo.reducer';

describe('TodoReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const state = todoFeature.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('getToDoListSuccess action', () => {
    it('should retrieve all todos and update the state in an immutable way', () => {
      const newTodoList: Todo[] = [
        {
          id: 1,
          name: 'My first todo',
          status: TodoStatus.InProgress,
        },
      ];
      const action = todoActions.getToDoListSuccess({ todoList: newTodoList });
      const state = todoFeature.reducer(initialState, action);

      expect(state.todoList).toEqual(newTodoList);
      expect(state.todoList).not.toBe(initialState.todoList);
    });
  });

  describe('changeStatusFilter action', () => {
    it('should retrieve the status filter and update the state in an immutable way', () => {
      const newStatusFilter = TodoStatus.InProgress;
      const action = todoActions.changeStatusFilter({
        status: newStatusFilter,
      });
      const state = todoFeature.reducer(initialState, action);

      expect(state.statusFilter).toEqual(newStatusFilter);
      expect(state.statusFilter).not.toBe(initialState.statusFilter);
    });

    it('should reset status filter and update the state in an immutable way', () => {
      const previousState: TodoState = {
        todoList: [],
        statusFilter: TodoStatus.Complete,
      };
      const newStatusFilter = undefined;
      const action = todoActions.changeStatusFilter({
        status: newStatusFilter,
      });
      const state = todoFeature.reducer(previousState, action);

      expect(state.statusFilter).toEqual(newStatusFilter);
      expect(state.statusFilter).not.toBe(previousState.statusFilter);
    });
  });

  describe('addToDoItem action', () => {
    it('should retrieve existing todos and new todo and update the state in an immutable way', () => {
      const previousState: TodoState = {
        ...initialState,
        todoList: [
          {
            id: 1,
            name: 'My first todo',
            status: TodoStatus.Complete,
          },
        ],
      };
      const newTodoName = 'My second todo';
      const action = todoActions.addToDoItem({ name: newTodoName });
      const state = todoFeature.reducer(previousState, action);

      expect(state.todoList[1].name).toEqual(newTodoName);
      expect(state.todoList).not.toBe(previousState.todoList);
    });
  });
});
