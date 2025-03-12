import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoPriority } from '../../services/todo.interface';
import { todoActions } from '../store/todo/todo.actions';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the valid todo name', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input')!;
    const button = compiled.querySelector('button')!;
    input.value = 'My first todo';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        todoActions.addToDoItem({
          name: 'My first todo',
          priority: TodoPriority.medium,
        })
      );
    });
  });

  it('should not submit an invalid todo name', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button')!;

    button.click();

    expect(dispatchSpy).not.toHaveBeenCalledWith(
      todoActions.addToDoItem({
        name: 'My first todo',
        priority: TodoPriority.medium,
      })
    );
  });

  it('should submit the priority', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button')!;

    component.newTodo.setValue({
      name: 'My first todo',
      priority: TodoPriority.high,
    });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button.click();

      expect(dispatchSpy).toHaveBeenCalledWith(
        todoActions.addToDoItem({
          name: 'My first todo',
          priority: TodoPriority.high,
        })
      );
    });
  });
});
