import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { todoActions } from '../store/todo/todo.actions';
import { Todo, TodoPriority, TodoStatus } from '../store/todo/todo.reducer';
import { getFilteredTodos } from '../store/todo/todo.selectors';
import { EditTodoListComponent } from './components/edit-todo-list/edit-todo-list.component';

const indexToStatusConverter: Record<number, TodoStatus | undefined> = {
  0: undefined,
  1: TodoStatus.InProgress,
  2: TodoStatus.Complete,
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [
    MatFormField,
    MatCard,
    MatCardContent,
    MatSelect,
    MatOption,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatTabGroup,
    MatTab,
    AsyncPipe,
    TitleCasePipe,
    EditTodoListComponent,
  ],
})
export class TodoComponent implements OnInit {
  private readonly store = inject(Store);
  readonly newTodo = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priority: new FormControl<TodoPriority | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  readonly todos$ = this.store.select(getFilteredTodos);
  priorities = Object.values(TodoPriority);

  ngOnInit(): void {
    this.store.dispatch(todoActions.getToDoList());
  }

  addNewTodo() {
    if (!this.newTodo.valid) return;
    this.store.dispatch(
      todoActions.addToDoItem({
        name: this.newTodo.value.name!,
        priority: this.newTodo.value.priority!,
      })
    );
  }

  changeTodoStatus(todo: Todo) {
    this.store.dispatch(todoActions.changeToDoStatus({ todo }));
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(todoActions.removeToDoItem({ todo }));
  }

  editTodo(todo: Todo) {
    this.store.dispatch(todoActions.openToDoEdit({ todo }));
  }

  changeFilter(index: number) {
    this.store.dispatch(
      todoActions.changeStatusFilter({ status: indexToStatusConverter[index] })
    );
  }
}
