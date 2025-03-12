import { CdkScrollable } from '@angular/cdk/scrolling';
import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Todo } from '../../../../services/todo.interface';
import { TodoPriority } from '../edit-todo-list/edit-todo-list.component';

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
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatSelect,
    MatOption,
    TitleCasePipe,
  ],
})
export class EditTodoDialogComponent implements OnInit {
  private readonly dialogRef =
    inject<MatDialogRef<EditTodoDialogComponent, Todo>>(MatDialogRef);
  readonly data = inject<EditTodoDialogData>(MAT_DIALOG_DATA);
  readonly priorities = Object.values(TodoPriority);
  readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priority: new FormControl<TodoPriority | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.form.setValue({
      name: this.data.todo.name ?? '',
      priority: this.data.todo.priority,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.form.valid) return;
    this.dialogRef.close({
      ...this.data.todo,
      name: this.form.value.name,
      priority: this.form.value.priority,
    });
  }
}
