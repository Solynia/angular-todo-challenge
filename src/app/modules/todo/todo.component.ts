import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { todoActions } from '../store/todo/todo.actions';
import { Todo, TodoStatus } from '../store/todo/todo.reducer';
import { getAllTodos } from '../store/todo/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatTabGroup,
    MatTab,
    MatMiniFabButton,
    MatIcon,
    AsyncPipe
],
})
export class TodoComponent implements OnInit {
  private store = inject(Store);
  dialog = inject(MatDialog);

  statusEnum = TodoStatus;

  newTodo = new FormControl('', [Validators.required]);

  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));

  ngOnInit(): void {
    this.store.dispatch(todoActions.getToDoList());
  }

  addNewTodo() {
    if (!this.newTodo.value) return;
    this.store.dispatch(todoActions.addToDoItem({ name: this.newTodo.value }));
  }

  changeTodoName(todo: Todo) {
    this.store.dispatch(todoActions.changeToDoName({ todo }));
  }

  changeTodoStatus(todo: Todo) {
    this.store.dispatch(todoActions.changeToDoStatus({ todo }));
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(todoActions.removeToDoItem({ todo }));
  }
}
