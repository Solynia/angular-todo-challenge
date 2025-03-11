import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EditTodoDialogComponent,
  EditTodoDialogData,
} from './edit-todo-dialog.component';

describe('EditTodoDialogComponent', () => {
  let component: EditTodoDialogComponent;
  let fixture: ComponentFixture<EditTodoDialogComponent>;
  const todo = { name: 'My first todo' };

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
    const button =
      compiled.querySelector<HTMLButtonElement>('button#submitBtn')!;
    const input = compiled.querySelector('input')!;
    const newName = `${todo.name} - edited`;
    input.value = newName;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button.click();

      expect(submitSpy).toHaveBeenCalled();
      expect(component.newName).toBe(newName);
    });
  });

  it('should not submit an invalid todo name', () => {
    const submitSpy = jest.spyOn(component, 'onSubmit');
    const compiled = fixture.nativeElement as HTMLElement;
    const button =
      compiled.querySelector<HTMLButtonElement>('button#submitBtn')!;
    const input = compiled.querySelector('input')!;
    const newName = '';
    input.value = newName;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button.click();

      expect(submitSpy).not.toHaveBeenCalled();
      expect(component.newName).toBe(newName);
    });
  });

  it('should cancel the edit', () => {
    const cancelSpy = jest.spyOn(component, 'onCancel');
    const compiled = fixture.nativeElement as HTMLElement;
    const button =
      compiled.querySelector<HTMLButtonElement>('button#cancelBtn')!;

    button.click();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
