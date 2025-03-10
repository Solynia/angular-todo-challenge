import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { todoActions } from './todo.actions';
import { Todo, TodoStatus } from './todo.reducer';

const todos: Todo[] = [
  {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete,
  },
  {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress,
  },
];

@Injectable()
export class TodoEffects {
  private readonly actions$ = inject(Actions);

  readonly getToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.getToDoList),
      switchMap((_action) =>
        of(todos).pipe(
          map((todoList) => todoActions.getToDoListSuccess({ todoList })),
          catchError((error) => of(todoActions.getToDoListFailure({ error })))
        )
      )
    )
  );
}
