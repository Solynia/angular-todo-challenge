import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/todo/todo.component').then((m) => m.TodoComponent),
  },
];
