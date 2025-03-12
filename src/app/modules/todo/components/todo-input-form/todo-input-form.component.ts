import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReplaySubject, takeUntil, tap } from 'rxjs';
import { TodoPriority } from '../edit-todo-list/edit-todo-list.component';

/**
 * https://blog.angular-university.io/angular-custom-form-controls/
 */

export interface TodoInputFormValue {
  name: string;
  priority: TodoPriority | undefined | null;
}

type TodoInputForm = {
  [P in keyof TodoInputFormValue]: FormControl<TodoInputFormValue[P]>;
};

type OnChangeFn = (value: TodoInputFormValue | null) => void;

type OnTouchedFn = () => void;

@Component({
  selector: 'app-todo-input-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    TitleCasePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TodoInputFormComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TodoInputFormComponent,
    },
  ],
  templateUrl: './todo-input-form.component.html',
  styleUrl: './todo-input-form.component.css',
})
export class TodoInputFormComponent
  implements ControlValueAccessor, Validator, AfterViewInit, OnDestroy
{
  protected destroyed$ = new ReplaySubject<void>(1);
  readonly priorities = Object.values(TodoPriority);

  readonly form = new FormGroup<TodoInputForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priority: new FormControl(undefined, {
      validators: [Validators.required],
    }),
  });

  /**
   * The value of the control
   */
  value: TodoInputFormValue | null = null;

  /**
   * Callback called on change
   * This will fired the new value to the parent
   * @param value FormulaInput
   */
  onChange = (_: TodoInputFormValue | null) => {};

  /**
   * Callback called on touched
   */
  onTouched = () => {};

  /**
   * The input is considered to be touched by the user.
   */
  touched = false;

  /**
   * Disable status of the input
   */
  disabled = false;

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          this.markAsTouched();
          this.onChange(this.form.getRawValue());
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Writes a new value to the element
   * Overriding from `ControlValueAccessor` interface
   * @param value new value FormulaInput
   */
  writeValue(value: TodoInputFormValue): void {
    this.form.setValue(value);
    this.value = value;
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   * Overriding from `ControlValueAccessor` interface
   * @param onChange callback function
   */
  registerOnChange(onChange: OnChangeFn) {
    this.onChange = onChange;
  }

  /**
   * Registers a callback function that is called when the control's touched.
   * Overriding from `ControlValueAccessor` interface
   * @param onTouched callback function
   */
  registerOnTouched(onTouched: OnTouchedFn) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  /**
   * Function that is called by the forms API when the control status changes to or from 'DISABLED'.
   * Depending on the status, it enables or disables the appropriate DOM element.
   * @param disabled disabled
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  /**
   * Contains logic for input validation
   * Overriding from `Validator` interface
   */
  validate(): ValidationErrors | null {
    if (!this.form.valid) {
      return { invalid: true };
    }
    return null;
  }
}
