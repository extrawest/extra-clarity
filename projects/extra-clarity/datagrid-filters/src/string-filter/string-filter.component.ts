import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, filterOffIcon } from '@cds/core/icon';
import { ClrDatagridFilter, ClrInput, ClrInputModule, ClrPopoverToggleService } from '@clr/angular';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';

import { EcDatagridFilter } from '../common/directives/datagrid-filter.directive';
import { EcFilterState } from '../common/interfaces/filter-state.interface';

import { EcStringValidatorEnum, EcValidationErrorEnum, uuidValidator } from './string-filter.utils';

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
  imports: [CommonModule, ReactiveFormsModule, CdsIconModule, ClrInputModule],
  providers: [
    // make EcStringFilterComponent queryable via @ViewChild(EcDatagridFilter)
    {
      provide: EcDatagridFilter,
      useExisting: EcStringFilterComponent,
    },
  ],
})
export class EcStringFilterComponent<T extends object = object>
  extends EcDatagridFilter<string, T>
  implements AfterViewInit, OnChanges, OnDestroy, OnInit
{
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
   * NOTE: Affects only client-driven filters, i.e. requires another input `[serverDriven]="false"`.
   * */
  @Input()
  public fullMatch = false;

  /**
   * String to be shown as the helper text under the input field when an entered value is valid
   * */
  @Input()
  public helperMessage?: string;

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
  public placeholder?: string;

  /**
   * When `[serverDriven]="true"`, it's a free-form identifier defined by a developer, that will be shown as `property`
   * in the output state to help identify the filter's state amidst another filters;
   *
   * When `[serverDriven]="false"`, it must be equal to the name of a field in the object passed to the `*clrDgItems`
   * directive on `<clr-dg-row>` to filter by, i.e. to decide whether a row should be shown or not.
   *
   * @required
   */
  @Input({ required: true })
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
  public validator?: EcStringValidatorEnum;

  /**
   * A value to be set as the actual filter's value on this input change. `undefined` will be ignored.
   *
   * If the provided string is invalid, the actual filter's value will be reset to the default state (an empty string).
   * */
  @Input()
  public value?: string;

  /**
   * Whether to use a string from the [placeholder] input as the text for the helper slot under the input field
   */
  @Input()
  public usePlaceholderAsHelperText: boolean = false;

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
   * `EventEmitter<EcFilterState<string>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<EcFilterState<string>>();

  @ViewChild('inputElement')
  protected inputElementRef?: ElementRef<HTMLInputElement>;

  @ViewChild(ClrInput)
  protected clrInputRef?: ClrInput;

  protected configErrors: string[] = [];
  protected filterValue = '';
  protected readonly formControl = new FormControl<string>('', { nonNullable: true });

  protected isInitiated = false;

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  override readonly changes = new Subject<void>();

  private minLengthValidatorFn?: ValidatorFn;

  private readonly destroy$ = new Subject<void>();

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() private clrDatagridFilterContainer?: ClrDatagridFilter,
    @Optional() private clrPopoverToggleService?: ClrPopoverToggleService,
  ) {
    super();
    this.clrDatagridFilterContainer?.setFilter(this);

    ClarityIcons.addIcons(filterOffIcon);
  }

  /**
   * Get the actual filter state in the same shape as it's emitted to the parent datagrid.
   *
   * @see {@link filterValueChanged} for more details
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  override get state(): EcFilterState<string> {
    return {
      property: this.propertyKey,
      value: this.filterValue,
    };
  }

  protected get isStateDefault(): boolean {
    return !this.filterValue;
  }

  protected get minLengthMessage(): string {
    return this.commonStrings.parse(this.commonStrings.keys.datagridFilters.minLengthMessage, {
      MIN_LENGTH: this.minLength.toString(),
    });
  }

  protected get validationErrorMessage(): string | undefined {
    if (this.formControl.valid) {
      return;
    }

    if (this.formControl.hasError(EcValidationErrorEnum.MIN_LENGTH)) {
      const { requiredLength } = this.formControl.getError(EcValidationErrorEnum.MIN_LENGTH);
      return this.commonStrings.parse(this.commonStrings.keys.datagridFilters.minLengthMessage, {
        MIN_LENGTH: requiredLength,
      });
    }

    if (this.formControl.hasError(EcValidationErrorEnum.MAX_LENGTH)) {
      const { requiredLength, actualLength } = this.formControl.getError(
        EcValidationErrorEnum.MAX_LENGTH,
      );
      return this.commonStrings.parse(this.commonStrings.keys.datagridFilters.maxLengthMessage, {
        ACTUAL_LENGTH: actualLength,
        REQUIRED_LENGTH: requiredLength,
      });
    }

    if (this.formControl.hasError(EcValidationErrorEnum.EMAIL)) {
      return this.commonStrings.keys.datagridFilters.emailNotValid;
    }

    if (this.formControl.hasError(EcValidationErrorEnum.UUID)) {
      return this.commonStrings.keys.datagridFilters.uuidNotValid;
    }

    if (this.formControl.hasError(EcValidationErrorEnum.PATTERN)) {
      return this.patternErrMsg || this.commonStrings.keys.datagridFilters.enteredValueInvalid;
    }

    return this.commonStrings.keys.datagridFilters.enteredValueInvalid;
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
          this.changeDetectorRef.markForCheck();
        }
        setTimeout(() => this.focusInputElement());
      });

    this.isInitiated = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && typeof this.value === 'string' && this.propertyKey) {
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

    this.commonStrings.stringsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  override accepts(item: T): boolean {
    if (this.serverDriven || !item || typeof item !== 'object' || !this.propertyKey) {
      return false;
    }

    const propertyValue = (item as Record<string | number, unknown>)[this.propertyKey];

    if (typeof propertyValue !== 'string') {
      return false;
    }

    const propertyValueToCompare = this.caseSensitive ? propertyValue : propertyValue.toLowerCase();

    const filterValueToCompare = this.caseSensitive
      ? this.filterValue
      : this.filterValue.toLowerCase();

    return this.fullMatch
      ? propertyValueToCompare === filterValueToCompare
      : propertyValueToCompare.includes(filterValueToCompare);
  }

  /**
   * Reset the filter to the clean state (an empty string).
   * */
  override clearSelection(): void {
    this.updateFormControlValue('');
  }

  /**
   * Indicate whether the filter is active, i.e. has a non-default value selected.
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  override isActive(): boolean {
    return !!this.propertyKey && !this.isStateDefault;
  }

  /**
   * Reset the filter to the default state (an empty string)
   * */
  override resetToDefault(): void {
    this.updateFormControlValue('');
  }

  /**
   * Set the actual filter's value.
   *
   * If the provided value is invalid, the filter value will be reset to default (an empty string).
   * */
  override setValue(value: string): void {
    if (this.propertyKey) {
      this.updateFormControlValue(value);
    }
  }

  protected onReset(): void {
    this.resetToDefault();
    this.focusInputElement();
  }

  private checkInputsValidity(): string[] {
    const inputsErrors: string[] = [];

    if (!this.propertyKey) {
      inputsErrors.push(this.commonStrings.keys.datagridFilters.propertyKeyRequired);
    }
    if (this.minLength < 1) {
      inputsErrors.push(
        this.commonStrings.parse(this.commonStrings.keys.datagridFilters.minLengthError, {
          MIN_LENGTH: this.minLength.toString(),
        }),
      );
    }
    if (this.maxLength < 1) {
      inputsErrors.push(
        this.commonStrings.parse(this.commonStrings.keys.datagridFilters.maxLengthError, {
          MAX_LENGTH: this.maxLength.toString(),
        }),
      );
    }
    if (this.maxLength < this.minLength) {
      inputsErrors.push(
        this.commonStrings.parse(this.commonStrings.keys.datagridFilters.rangeLengthError, {
          MAX_LENGTH: this.maxLength.toString(),
          MIN_LENGTH: this.minLength.toString(),
        }),
      );
    }
    if (!this.pattern && this.validator === EcStringValidatorEnum.PATTERN) {
      inputsErrors.push(this.commonStrings.keys.datagridFilters.patternError);
    }
    if (this.pattern && this.validator !== EcStringValidatorEnum.PATTERN) {
      inputsErrors.push(this.commonStrings.keys.datagridFilters.validationError);
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

    if (this.validator === EcStringValidatorEnum.EMAIL) {
      this.formControl.addValidators(Validators.email);
    }
    if (this.validator === EcStringValidatorEnum.UUID) {
      this.formControl.addValidators(uuidValidator());
    }
    if (this.validator === EcStringValidatorEnum.PATTERN && this.pattern) {
      this.formControl.addValidators(Validators.pattern(this.pattern));
    }

    this.formControl.updateValueAndValidity({ emitEvent: false });

    this.minLengthValidatorFn = Validators.minLength(this.minLength);
  }

  private updateFilterValue(value: string, params: { emit: boolean } = { emit: true }): void {
    if (value === this.filterValue) {
      return;
    }

    this.filterValue = value;

    if (params.emit && this.isInitiated) {
      this.filterValueChanged.emit(this.state);
      this.changes.next();
    }

    this.updateMinLengthValidator();
    this.changeDetectorRef.markForCheck();
  }

  private updateFormControlValue(newValue: string): void {
    if (newValue.length > 0 && newValue.length < this.minLength) {
      return;
    }

    this.formControl.setValue(newValue, { emitEvent: false });
    this.clrInputRef?.triggerValidation();

    if (newValue && this.formControl.invalid) {
      this.updateFormControlValue('');
      return;
    }

    this.updateFilterValue(newValue);
  }

  private updateMinLengthValidator(): void {
    // MinLength Validator is active for showing an error only when there is a filter value stored.
    // If there is no valid filter value yet, min-length warning is shown as a hint, not an error.

    if (!this.minLengthValidatorFn) return;

    const hasValidator = this.formControl.hasValidator(this.minLengthValidatorFn);

    if (hasValidator && !this.filterValue) {
      this.formControl.removeValidators(this.minLengthValidatorFn);
      this.formControl.updateValueAndValidity({ emitEvent: false });
      return;
    }

    if (!hasValidator && this.filterValue) {
      this.formControl.addValidators(this.minLengthValidatorFn);
      this.formControl.updateValueAndValidity({ emitEvent: false });
    }
  }
}
