import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoPriority } from '../edit-todo-list/edit-todo-list.component';
import {
  EditTodoDialogComponent,
  EditTodoDialogData,
} from './edit-todo-dialog.component';

describe('EditTodoDialogComponent', () => {
  let component: EditTodoDialogComponent;
  let fixture: ComponentFixture<EditTodoDialogComponent>;
  const todo = { name: 'My first todo', priority: TodoPriority.high };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: (todo?: { name: string }) => {} },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { todo } as EditTodoDialogData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the valid todo name', () => {
    const submitSpy = jest.spyOn(component, 'onSubmit');
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector<HTMLButtonElement>('#submitBtn')!;
    const newName = `${todo.name} - edited`;
    component.control.setValue({ name: newName, priority: TodoPriority.low });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button.click();

      expect(submitSpy).toHaveBeenCalled();
      expect(component.control.value.name).toBe(newName);
    });
  });

  it('should not submit an invalid todo name', () => {
    const submitSpy = jest.spyOn(component, 'onSubmit');
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector<HTMLButtonElement>('#submitBtn')!;
    const newName = '';
    component.control.setValue({ name: newName, priority: TodoPriority.low });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button.click();

      expect(submitSpy).not.toHaveBeenCalled();
      expect(component.control.value.name).toBe(newName);
    });
  });

  it('should cancel the edit', () => {
    const cancelSpy = jest.spyOn(component, 'onCancel');
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector<HTMLButtonElement>('#cancelBtn')!;

    button.click();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
