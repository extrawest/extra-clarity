import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ClrDatagridFilter,
  ClrDatagridFilterInterface,
  ClrInput,
  ClrInputModule,
  ClrPopoverToggleService,
} from '@clr/angular';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';

import { FilterState, ResettableFilter } from '../interfaces/filter-state.interface';

import { StringValidatorEnum, uuidValidator, ValidationErrorEnum } from './string-filter.utils';

export const STRING_FILTER_DEFAULTS = {
  debounceTimeMs: 300,
  maxLength: 200,
  minLength: 1,
  placeholder: 'Type to search...',
  widthPx: 250,
} as const;

@Component({
  selector: 'ec-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrInputModule,
  ],
})
export class StringFilterComponent<T extends object = {}>
implements ClrDatagridFilterInterface<T, FilterState<string>>, ResettableFilter,
  AfterViewInit, OnChanges, OnDestroy, OnInit {
  /**
   * Comparison type for the filtering algorithm:
   * * `false` = case-insensitive, when both filter value and cell content value are transformed to lower case
   * before comparing;
   * * `true` = case-sensitive, when both filter value and cell content value are compared directly
   * without any transformation.
   *
   * NOTE: Affects only client-driven filters, i.e. requires another input `[serverDriven]="false"`.
   */
  @Input()
  public caseSensitive = false;

  /**
   * Debounce delay for the input field in milliseconds, i.e. a delay between entering the last character and assigning
   * the entered value to the filterValue. Ignored on clearing the input field.
   */
  @Input()
  public debounceTimeMs: number = STRING_FILTER_DEFAULTS.debounceTimeMs;

  /**
   * Comparison type for the filtering algorithm of client-driven filters:
   * * `false` = search for partial and full matches;
   * * `true` = search for a full match only.
   *
   * For server-driven, this input affects only the helper hint under the input field.
   * */
  @Input()
  public fullMatch = false;

  /**
   * Max length validation for the filter's value.
   *
   * Utilizes `Validators.maxlength` from `@angular/forms`.
   *
   * This input is read only on component initialization.
   * */
  @Input()
  public maxLength: number = STRING_FILTER_DEFAULTS.maxLength;

  /**
   * Min length validation for the filter's value.
   * */
  @Input()
  public minLength: number = STRING_FILTER_DEFAULTS.minLength;

  /**
   * Pattern for a validator that requires the entered value to match a regex pattern.
   *
   * Utilizes `Validators.pattern` from `@angular/forms`.
   *
   * Requires another input `[validator]` to be set to "'pattern'"`.
   *
   * This input is read only on component initialization.
   */
  @Input()
  public pattern?: string | RegExp;

  /**
   * Error message shown under the input field if the entered value is invalid due to the `pattern` validator
   * */
  @Input()
  public patternErrMsg?: string;

  /**
   * Placeholder for the empty input field
   * */
  @Input()
  public placeholder: string = STRING_FILTER_DEFAULTS.placeholder;

  /**
   * Free-from identifier of a filtering field to be shown in the helper text under the input field.
   *
   * If not set, the `[propertyKey]` value will be used instead.
   * */
  @Input()
  public propertyDisplayName?: string;

  /**
   * When `[serverDriven]="true"`, it's a free-form identifier defined by a developer, that will be shown as `property`
   * in the output state to help identify the filter's state amidst another filters;
   *
   * When `[serverDriven]="false"`, it must be equal to the name of a field in the object passed to the `[clrDgItem]`
   * input on `<clr-dg-row>` to filter by, i.e. to decide whether a row should be shown or not.
   *
   * @required
   */
  @Input()
  public propertyKey = '';

  /**
   * Whether the filter and the datagrid are server-driven:
   * * `true` = filtering is processed externally (e.g. by a backend), not by the filter.
   * * `false` = filtering is processed by the filter's `accepts()` method.
   *
   * @required
   */
  @Input()
  public serverDriven = true;

  /**
   * Apply an additional validator for the entered value. Options:
   * * `'email'`: apply `Validators.email` from `@angular/forms`.
   * * `'pattern'`: apply `Validators.pattern` from `@angular/forms`;
   * the regular expression must be set via the `[pattern]` input.
   * * `'uuid'`: test the entered value against a predefined regular expression to allow only uuid-like strings.
   *
   * This input is read only on component initialization.
   */
  @Input()
  public validator?: StringValidatorEnum;

  /**
   * A value to be set as the actual filter's value on this input change. `undefined` will be ignored.
   *
   * If the provided string is invalid, the actual filter's value will be reset to the default state (an empty string).
   * */
  @Input()
  public value?: string;

  /**
   * Width in pixels of the filter's container
   * */
  @Input()
  public widthPx: number = STRING_FILTER_DEFAULTS.widthPx;

  /**
   * Emits the filter's state object on every change of the internal filter value.
   * The state object contains the name of a `property` to filter by, defined by the `[propertyKey]` input,
   * and the actual filter `value` as a string.
   *
   * The same object is emitted by the `(clrDgRefresh)` output of the `<clr-datagrid>` parent component
   * for all non-default filter values.
   *
   * `EventEmitter<FilterState<string>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<FilterState<string>>();

  @ViewChild('inputElement')
  protected inputElementRef?: ElementRef<HTMLInputElement>;

  @ViewChild(ClrInput)
  protected clrInputRef?: ClrInput;

  protected configErrors: string[] = [];
  protected filterValue = '';
  protected readonly formControl = new FormControl<string>('', { nonNullable: true });

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  readonly changes = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  private readonly changeDetectionRef = inject(ChangeDetectorRef);
  private readonly clrDatagridFilterContainer = inject(ClrDatagridFilter, { optional: true });
  private readonly clrPopoverToggleService = inject(ClrPopoverToggleService, { optional: true });

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {
    this.clrDatagridFilterContainer?.setFilter(this);
  }

  /**
   * Get the actual filter state in the same shape as it's emitted to the parent datagrid.
   *
   * @see {@link filterValueChanged} for more details
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  get state(): FilterState<string> {
    return {
      property: this.propertyKey,
      value: this.filterValue,
    };
  }

  protected get isStateDefault(): boolean {
    return !this.filterValue;
  }

  protected get isValueTooShort(): boolean {
    return this.formControl.value.length < this.minLength;
  }

  protected get validationErrorMessage(): string | undefined {
    if (this.formControl.valid) {
      return;
    }

    if (this.formControl.hasError(ValidationErrorEnum.MIN_LENGTH)) {
      const { requiredLength } = this.formControl.getError(ValidationErrorEnum.MIN_LENGTH);
      return `Please provide at least ${requiredLength} characters`;
    }

    if (this.formControl.hasError(ValidationErrorEnum.MAX_LENGTH)) {
      const { requiredLength, actualLength } = this.formControl.getError(ValidationErrorEnum.MAX_LENGTH);
      return `Max length exceeded (${actualLength}/${requiredLength})`;
    }

    if (this.formControl.hasError(ValidationErrorEnum.EMAIL)) {
      return `The entered value is not a valid e-mail`;
    }

    if (this.formControl.hasError(ValidationErrorEnum.UUID)) {
      return `The entered value is not a valid uuid`;
    }

    if (this.formControl.hasError(ValidationErrorEnum.PATTERN)) {
      return this.patternErrMsg || 'The entered value is invalid';
    }

    return 'The entered value is invalid';
  }

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  accepts(item: T): boolean {
    if (this.serverDriven || !item || typeof item !== 'object' || !this.propertyKey) {
      return false;
    }

    const propertyValue = (item as Record<string | number, unknown>)[this.propertyKey];

    if (typeof propertyValue !== 'string') {
      return false;
    }

    const propertyValueToCompare = this.caseSensitive
      ? propertyValue
      : propertyValue.toLowerCase();

    const filterValueToCompare = this.caseSensitive
      ? this.filterValue
      : this.filterValue.toLowerCase();

    return this.fullMatch
      ? propertyValueToCompare === filterValueToCompare
      : propertyValueToCompare.includes(filterValueToCompare);
  }

  /**
   * Indicate whether the filter is active, i.e. has a non-default value selected.
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  isActive(): boolean {
    return !!this.propertyKey && !this.isStateDefault;
  }

  ngAfterViewInit(): void {
    this.clrPopoverToggleService?.openChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen: boolean) => {
        if (!isOpen) {
          return;
        }
        if (this.formControl.value !== this.filterValue) {
          this.updateFormControlValue(this.filterValue);
          this.clrInputRef?.triggerValidation();
          this.changeDetectionRef.markForCheck();
        }
        setTimeout(() => this.focusInputElement());
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && (typeof this.value === 'string') && this.propertyKey) {
      this.updateFormControlValue(this.value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.configErrors = this.checkInputsValidity();

    this.setupValidators();

    if (this.formControl.invalid) {
      this.updateFormControlValue('');
    }

    this.observeInputChanges();

    this.formControl.markAsTouched();
  }

  /**
   * Reset the filter to the default state (an empty string)
   * */
  resetToDefault(): void {
    this.updateFormControlValue('');
  }

  /**
   * Set the actual filter's value.
   *
   * If the provided value is invalid, the filter value will be reset to default (an empty string).
   * */
  setValue(value: string): void {
    if (this.propertyKey) {
      this.updateFormControlValue(value);
    }
  }

  protected onReset(): void {
    this.resetToDefault();
    this.focusInputElement();
  }

  private checkInputsValidity(): string[] {
    if (!this.propertyDisplayName) {
      this.propertyDisplayName = this.propertyKey;
    }

    const inputsErrors: string[] = [];

    if (!this.propertyKey) {
      inputsErrors.push('[propertyKey] is required');
    }
    if (this.minLength < 1) {
      inputsErrors.push(`[minLength] must be positive (current value: ${this.minLength})`);
    }
    if (this.maxLength < 1) {
      inputsErrors.push(`[maxLength] must be positive (current value: ${this.maxLength})`);
    }
    if (this.maxLength < this.minLength) {
      inputsErrors.push(`[maxLength] must be less than or equal to [minLength] (${this.maxLength} < ${this.minLength})`);
    }
    if (!this.pattern && this.validator === StringValidatorEnum.PATTERN) {
      inputsErrors.push(`'[pattern] is required when [validator]="'pattern'"`);
    }
    if (this.pattern && this.validator !== StringValidatorEnum.PATTERN) {
      inputsErrors.push(`[pattern] is provided, but [validator] is not set to 'pattern'`);
    }

    return inputsErrors;
  }

  private focusInputElement(): void {
    this.inputElementRef?.nativeElement.focus();
  }

  private observeInputChanges(): void {
    this.formControl.valueChanges
      .pipe(
        tap((value) => !value && this.updateFilterValue('')),
        debounceTime(this.debounceTimeMs),
        takeUntil(this.destroy$),
      )
      .subscribe((value: string) => {
        if (
          this.formControl.value === value &&
          this.formControl.valid &&
          value.length >= this.minLength
        ) {
          this.updateFilterValue(value);
        }
      });
  }

  private setupValidators(): void {
    this.formControl.addValidators(Validators.maxLength(this.maxLength));

    if (this.validator === StringValidatorEnum.EMAIL) {
      this.formControl.addValidators(Validators.email);
    }
    if (this.validator === StringValidatorEnum.UUID) {
      this.formControl.addValidators(uuidValidator());
    }
    if (this.validator === StringValidatorEnum.PATTERN && this.pattern) {
      this.formControl.addValidators(Validators.pattern(this.pattern));
    }

    this.formControl.updateValueAndValidity({ emitEvent: false });
  }

  private updateFilterValue(
    value: string,
    params: { emit: boolean } = { emit: true },
  ): void {
    if (value === this.filterValue) {
      return;
    }
    this.filterValue = value;
    if (params.emit) {
      this.filterValueChanged.emit(this.state);
      this.changes.next();
    }
    this.changeDetectorRef.markForCheck();
  }

  private updateFormControlValue(newValue: string): void {
    if (newValue.length > 0 && newValue.length < this.minLength) {
      return;
    }

    this.formControl.setValue(newValue, { emitEvent: false });

    if (newValue && this.formControl.invalid) {
      this.updateFormControlValue('');
      return;
    }

    this.updateFilterValue(newValue);
  }
}
