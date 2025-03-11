import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { todoActions } from './todo.actions';
import { todos } from './todo.const';
import { getToDoList$, openEditToDoDialog$ } from './todo.effects';

describe('ToDoEffects', () => {
  it('loads todos successfully', (done) => {
    const actionsMock$ = of(todoActions.getToDoList());

    getToDoList$(actionsMock$).subscribe((action) => {
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
