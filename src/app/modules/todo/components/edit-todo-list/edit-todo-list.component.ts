import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { Todo } from '../../../../services/todo.interface';

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export enum TodoPriority {
  low = 'LOW',
  medium = 'MEDIUM',
  high = 'HIGH',
}

const defaultArray = (value: Todo[] | null) => value ?? [];

const priorityToColorConverter = {
  [TodoPriority.high]: 'warn',
  [TodoPriority.medium]: 'accent',
  [TodoPriority.low]: 'primary',
};
@Component({
  selector: 'app-edit-todo-list',
  imports: [
    MatIcon,
    MatPaginator,
    MatMiniFabButton,
    MatCard,
    MatCardContent,
    MatDivider,
    MatChip,
    TitleCasePipe,
  ],
  templateUrl: './edit-todo-list.component.html',
  styleUrl: './edit-todo-list.component.css',
})
export class EditTodoListComponent {
  readonly statusEnum = TodoStatus;
  readonly priorityToColor = priorityToColorConverter;

  todos = input([], { transform: defaultArray });
  emptyPlaceholder = input<string>();
  count = input.required<number>();
  pageIndex = input.required<number>();
  pageSize = input.required<number>();
  pageChanged = output<number>();
  completeClicked = output<Todo>();
  deleteClicked = output<Todo>();
  editClicked = output<Todo>();
}
