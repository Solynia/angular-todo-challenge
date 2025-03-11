import { of } from 'rxjs';
import { todoActions } from './todo.actions';
import { todos } from './todo.const';
import { getToDoList$ } from './todo.effects';

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
});
