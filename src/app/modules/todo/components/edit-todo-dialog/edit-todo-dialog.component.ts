import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-edit-todo-dialog',
    templateUrl: './edit-todo-dialog.component.html',
    styleUrls: ['./edit-todo-dialog.component.css'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, FormsModule, MatDialogActions, MatButton, MatDialogClose]
})
export class EditTodoDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<EditTodoDialogComponent>>(MatDialogRef);

  newName = '';

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
