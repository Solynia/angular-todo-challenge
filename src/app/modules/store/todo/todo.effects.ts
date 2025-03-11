import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import {
  EditTodoDialogComponent,
  EditTodoDialogData,
} from '../../todo/components/edit-todo-dialog/edit-todo-dialog.component';
import { todoActions } from './todo.actions';
import { todos } from './todo.const';
import { Todo } from './todo.reducer';

export const getToDoList$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(todoActions.getToDoList),
      switchMap((_action) =>
        of(todos).pipe(
          map((todoList) => todoActions.getToDoListSuccess({ todoList })),
          catchError((error) => of(todoActions.getToDoListFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const openEditToDoDialog$ = createEffect(
  (actions$ = inject(Actions), matDialog = inject(MatDialog)) =>
    actions$.pipe(
      ofType(todoActions.openToDoEdit),
      exhaustMap(({ todo }) =>
        matDialog
          .open<EditTodoDialogComponent, EditTodoDialogData, Todo>(
            EditTodoDialogComponent,
            { data: { todo } }
          )
          .afterClosed()
          .pipe(
            filter((result) => !!result),
            map((newTodo) => todoActions.changeToDoName({ todo: newTodo }))
          )
      )
    ),
  { functional: true }
);
