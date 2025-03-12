import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import {
  Todo,
  TodoPriority,
  TodoStatus,
} from '../../../services/todo.interface';
import { todoActions } from './todo.actions';
import { getToDoList$, openEditToDoDialog$ } from './todo.effects';

const todos: Todo[] = [
  {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete,
    priority: TodoPriority.low,
  },
  {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.medium,
  },
];

describe('ToDoEffects', () => {
  it('loads todos successfully', (done) => {
    const actionsMock$ = of(todoActions.getToDoList());
    const todoServiceMock = { getAll: () => of(todos) };

    getToDoList$(actionsMock$, todoServiceMock).subscribe((action) => {
      expect(action).toEqual(
        todoActions.getToDoListSuccess({ todoList: todos })
      );
      done();
    });
  });

  it('opens edit todo dialog', () => {
    const actionsMock$ = of(todoActions.openToDoEdit({ todo: todos[0] }));
    const matDialogServiceMock = { open: () => ({}) } as unknown as MatDialog;
    const openSpy = jest.spyOn(matDialogServiceMock, 'open');

    openEditToDoDialog$(actionsMock$, matDialogServiceMock).subscribe();
    expect(openSpy).toHaveBeenCalled();
  });
});
