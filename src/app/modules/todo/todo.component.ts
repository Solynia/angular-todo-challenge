import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { createSelector, Store } from '@ngrx/store';
import { Todo, TodoStatus } from '../../services/todo.interface';
import { todoActions } from '../store/todo/todo.actions';
import { getPaginatedTodos, getTodoCounts } from '../store/todo/todo.selectors';
import { EditTodoListComponent } from './components/edit-todo-list/edit-todo-list.component';
import {
  TodoInputFormComponent,
  TodoInputFormValue,
} from './components/todo-input-form/todo-input-form.component';

const indexToStatusConverter: Record<number, TodoStatus | undefined> = {
  0: undefined,
  1: TodoStatus.InProgress,
  2: TodoStatus.Complete,
};

const getLists = createSelector(getTodoCounts, (counts) => {
  return [
    {
      count: counts.total,
      label: `All Todos (${counts.total})`,
      emptyPlaceholder: 'No todos',
    },
    {
      count: counts.IN_PROGRESS,
      label: `In Progress (${counts.IN_PROGRESS})`,
      emptyPlaceholder: 'No todos in progress',
    },
    {
      count: counts.COMPLETE,
      label: `Completed (${counts.COMPLETE})`,
      emptyPlaceholder: 'No completed todos',
    },
  ];
});

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatButton,
    MatTabGroup,
    MatTab,
    AsyncPipe,
    EditTodoListComponent,
    TodoInputFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  private readonly store = inject(Store);
  readonly todoPage$ = this.store.select(getPaginatedTodos);
  readonly lists$ = this.store.select(getLists);
  readonly control = new FormControl<TodoInputFormValue>(
    { name: '', priority: null },
    { nonNullable: true }
  );

  ngOnInit(): void {
    this.store.dispatch(todoActions.getToDoList());
  }

  addNewTodo() {
    if (!this.control.valid) return;
    this.store.dispatch(
      todoActions.addToDoItem({
        name: this.control.value.name!,
        priority: this.control.value.priority!,
      })
    );
    this.control.reset();
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

  changePage(index: number) {
    this.store.dispatch(todoActions.changePage({ index }));
  }
}
