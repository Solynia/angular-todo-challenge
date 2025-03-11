import { todoActions } from './todo.actions';
import {
  initialState,
  Todo,
  todoFeature,
  TodoPriority,
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

    it('should reset the page index and update the state in an immutable way', () => {
      const newTodoList: Todo[] = [
        {
          id: 1,
          name: 'My first todo',
          status: TodoStatus.InProgress,
        },
      ];
      const previousState: TodoState = {
        ...initialState,
        pageIndex: 2,
      };
      const action = todoActions.getToDoListSuccess({ todoList: newTodoList });

      const state = todoFeature.reducer(previousState, action);

      expect(state.pageIndex).toEqual(0);
      expect(state.pageIndex).not.toBe(previousState.pageIndex);
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
        ...initialState,
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

    it('should reset the page index and update the state in an immutable way', () => {
      const previousState: TodoState = {
        ...initialState,
        todoList: [],
        statusFilter: TodoStatus.Complete,
        pageIndex: 2,
      };
      const newStatusFilter = TodoStatus.InProgress;
      const action = todoActions.changeStatusFilter({
        status: newStatusFilter,
      });

      const state = todoFeature.reducer(previousState, action);

      expect(state.pageIndex).toEqual(0);
      expect(state.pageIndex).not.toBe(previousState.pageIndex);
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
      const newPriority = TodoPriority.medium;
      const action = todoActions.addToDoItem({
        name: newTodoName,
        priority: newPriority,
      });

      const state = todoFeature.reducer(previousState, action);

      expect(state.todoList[1].name).toEqual(newTodoName);
      expect(state.todoList[1].priority).toEqual(newPriority);
      expect(state.todoList).not.toBe(previousState.todoList);
    });
  });

  describe('changeToDoStatus action', () => {
    it('should change status from InProgress to Complete and update the state in an immutable way', () => {
      const todo = {
        id: 1,
        name: 'My first todo',
        status: TodoStatus.InProgress,
      };
      const previousState: TodoState = {
        ...initialState,
        todoList: [todo],
      };
      const action = todoActions.changeToDoStatus({ todo });

      const state = todoFeature.reducer(previousState, action);

      expect(state.todoList[0].id).toEqual(todo.id);
      expect(state.todoList[0].status).toEqual(TodoStatus.Complete);
      expect(state.todoList).not.toBe(previousState.todoList);
    });

    it('should change status from Complete to InProgress and update the state in an immutable way', () => {
      const todo = {
        id: 1,
        name: 'My first todo',
        status: TodoStatus.Complete,
      };
      const previousState: TodoState = {
        ...initialState,
        todoList: [todo],
      };
      const action = todoActions.changeToDoStatus({ todo });

      const state = todoFeature.reducer(previousState, action);

      expect(state.todoList[0].id).toEqual(todo.id);
      expect(state.todoList[0].status).toEqual(TodoStatus.InProgress);
      expect(state.todoList).not.toBe(previousState.todoList);
    });
  });

  describe('removeToDoItem action', () => {
    it('should retrieve remaining todos and update the state in an immutable way', () => {
      const todo1 = {
        id: 1,
        name: 'My first todo',
        status: TodoStatus.Complete,
      };
      const todo2 = {
        id: 2,
        name: 'My second todo',
        status: TodoStatus.InProgress,
      };
      const previousState: TodoState = {
        ...initialState,
        todoList: [todo1, todo2],
      };
      const action = todoActions.removeToDoItem({ todo: todo1 });

      const state = todoFeature.reducer(previousState, action);

      expect(state.todoList.length).toEqual(1);
      expect(state.todoList[0].id).toEqual(todo2.id);
      expect(state.todoList).not.toBe(previousState.todoList);
    });

    it('should not change the state when the todo does not exist', () => {
      const realTodo = {
        id: 1,
        name: 'My first todo',
        status: TodoStatus.Complete,
      };
      const unkownTodo = {
        id: 2,
        name: 'My second todo',
        status: TodoStatus.InProgress,
      };
      const previousState: TodoState = {
        ...initialState,
        todoList: [realTodo],
      };
      const action = todoActions.removeToDoItem({ todo: unkownTodo });

      const state = todoFeature.reducer(previousState, action);

      expect(state.todoList.length).toEqual(1);
      expect(state.todoList[0].id).toEqual(realTodo.id);
      expect(state.todoList).toEqual(previousState.todoList);
    });
  });

  describe('changeToDoNameAndPriority action', () => {
    it('should change name and update the state in an immutable way', () => {
      const todo = {
        id: 1,
        name: 'My first todo',
        status: TodoStatus.InProgress,
        priority: TodoPriority.medium,
      };
      const previousState: TodoState = {
        ...initialState,
        todoList: [todo],
      };
      const newName = `${todo} - edited`;
      const newPriority = TodoPriority.high;
      const action = todoActions.changeToDoNameAndPriority({
        todo: { ...todo, name: newName, priority: newPriority },
      });

      const state = todoFeature.reducer(previousState, action);

      expect(state.todoList[0].id).toEqual(todo.id);
      expect(state.todoList[0].name).toEqual(newName);
      expect(state.todoList[0].priority).toEqual(newPriority);
      expect(state.todoList).not.toBe(previousState.todoList);
    });
  });

  describe('changePage action', () => {
    it('should change the page index', () => {
      const previousState: TodoState = {
        ...initialState,
        pageIndex: 1,
        todoList: [
          {
            id: 1,
            name: 'My first todo',
            status: TodoStatus.Complete,
          },
        ],
      };
      const index = 0;
      const action = todoActions.changePage({ index });

      const state = todoFeature.reducer(previousState, action);

      expect(state.pageIndex).toEqual(index);
      expect(state.pageIndex).not.toBe(previousState.pageIndex);
    });

    it('should fallback to the last page if the index exceeds it', () => {
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
      const action = todoActions.changePage({ index: 1 });

      const state = todoFeature.reducer(previousState, action);

      expect(state.pageIndex).toEqual(0);
    });
  });
});
