import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { TodoEffects } from './modules/store/todo/todo.effects';
import { todoFeature } from './modules/store/todo/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideStore(),
    provideState(todoFeature),
    provideEffects([TodoEffects]),
  ],
};
