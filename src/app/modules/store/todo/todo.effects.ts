import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as actions from './todo.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Todo, TodoStatus } from "./todo.reducer"

const todos: Todo[] = [
  {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete
  },
  {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress
  }
];

@Injectable()
export class TodoEffects {

  getToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTodos),
      switchMap((_action) => of(todos).pipe(
          map((todoList) => actions.getTodosSuccess({ todoList })),
          catchError((error) => of(actions.getTodosFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}
}
