import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTodoListComponent } from './edit-todo-list.component';

describe('EditTodoListComponent', () => {
  let component: EditTodoListComponent;
  let componentRef: ComponentRef<EditTodoListComponent>;
  let fixture: ComponentFixture<EditTodoListComponent>;

  const todo1 = {
    id: 1,
    name: 'My first todo',
  };
  const todo2 = {
    id: 2,
    name: 'My second todo',
  };
  const todos = [todo1, todo2];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render every received todo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    componentRef.setInput('todos', todos);
    componentRef.setInput('count', 2);
    componentRef.setInput('pageIndex', 0);
    componentRef.setInput('pageSize', 5);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.todo-item').length).toBe(2);
  });

  it('should render the placeholder when empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    componentRef.setInput('todos', []);
    const emptyPlaceholder = 'No todos';
    componentRef.setInput('emptyPlaceholder', emptyPlaceholder);
    componentRef.setInput('count', 0);
    componentRef.setInput('pageIndex', 0);
    componentRef.setInput('pageSize', 5);
    fixture.detectChanges();

    const items = compiled.querySelectorAll('.todo-item');
    expect(items.length).toBe(1);
    expect(items[0].innerHTML).toContain(emptyPlaceholder);
  });

  it('should mark todo as completed', () => {
    let selectedTodo;
    component.completeClicked.subscribe((todo) => (selectedTodo = todo));
    componentRef.setInput('todos', todos);
    componentRef.setInput('count', 2);
    componentRef.setInput('pageIndex', 0);
    componentRef.setInput('pageSize', 5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector<HTMLButtonElement>('#completeBtn')!;

    button.click();

    expect(selectedTodo).toBe(todo1);
  });

  it('should mark todo as deleted', () => {
    let selectedTodo;
    component.deleteClicked.subscribe((todo) => (selectedTodo = todo));
    componentRef.setInput('todos', todos);
    componentRef.setInput('count', 2);
    componentRef.setInput('pageIndex', 0);
    componentRef.setInput('pageSize', 5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector<HTMLButtonElement>('#deleteBtn')!;

    button.click();

    expect(selectedTodo).toBe(todo1);
  });

  it('should mark todo as edited', () => {
    let selectedTodo;
    component.editClicked.subscribe((todo) => (selectedTodo = todo));
    componentRef.setInput('todos', todos);
    componentRef.setInput('count', 2);
    componentRef.setInput('pageIndex', 0);
    componentRef.setInput('pageSize', 5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector<HTMLDivElement>(
      '.todo-item:nth-child(1)'
    )!;

    div.click();

    expect(selectedTodo).toBe(todo1);
  });
});
