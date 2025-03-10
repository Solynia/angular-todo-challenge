import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/todo/todo.routes').then((m) => m.routes),
  },
];
