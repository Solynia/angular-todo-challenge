import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Todo } from '../../../../services/todo.interface';
import {
  TodoInputFormComponent,
  TodoInputFormValue,
} from '../todo-input-form/todo-input-form.component';

export interface EditTodoDialogData {
  todo: Todo;
}

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css'],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    TodoInputFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTodoDialogComponent implements OnInit {
  private readonly dialogRef =
    inject<MatDialogRef<EditTodoDialogComponent, Todo>>(MatDialogRef);
  readonly data = inject<EditTodoDialogData>(MAT_DIALOG_DATA);
  readonly control = new FormControl<TodoInputFormValue>(
    { name: '', priority: undefined },
    { nonNullable: true }
  );

  ngOnInit(): void {
    this.control.setValue({
      name: this.data.todo.name ?? '',
      priority: this.data.todo.priority,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.control.valid) return;
    this.dialogRef.close({
      ...this.data.todo,
      name: this.control.value.name,
      priority: this.control.value.priority ?? undefined,
    });
  }
}
