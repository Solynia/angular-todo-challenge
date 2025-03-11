import { Component, input, output } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Todo } from 'src/app/modules/store/todo/todo.reducer';

const defaultArray = (value: Todo[] | null) => value ?? [];

@Component({
  selector: 'app-edit-todo-list',
  imports: [MatIcon, MatMiniFabButton],
  templateUrl: './edit-todo-list.component.html',
  styleUrl: './edit-todo-list.component.css',
})
export class EditTodoListComponent {
  todos = input([], { transform: defaultArray });
  emptyPlaceholder = input<string>();
  completeClicked = output<Todo>();
  deleteClicked = output<Todo>();
}
