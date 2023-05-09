import { CommonModule } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ClrDatagridFilter, ClrDatagridFilterInterface, ClrInput, ClrInputModule, ClrPopoverToggleService,
} from '@clr/angular';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';

import { FilterState } from '../interfaces/filter-state.interface';

import { StringValidatorEnum, uuidValidator, ValidationErrorEnum } from './datagrid-string-filter.utils';

const DEFAULT_CONTAINER_WIDTH_PX = 250;
const DEFAULT_DEBOUNCE_TIME_MS = 300;
const DEFAULT_MIN_LENGTH = 1;
const DEFAULT_MAX_LENGTH = 200;
const DEFAULT_PLACEHOLDER = 'Type to search...';

@Component({
  selector: 'ec-datagrid-string-filter',
  templateUrl: './datagrid-string-filter.component.html',
  styleUrls: ['./datagrid-string-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrInputModule,
  ],
})
export class DatagridStringFilterComponent<T>
implements ClrDatagridFilterInterface<T, FilterState<string>>, AfterViewInit, OnDestroy, OnInit {
  @Input() set value(newValue: string) {
    this.updateFormControlValue(newValue);
  }

  @Input() debounceTimeMs: number = DEFAULT_DEBOUNCE_TIME_MS;
  @Input() maxLength: number = DEFAULT_MAX_LENGTH;
  @Input() minLength: number = DEFAULT_MIN_LENGTH;
  @Input() pattern?: string | RegExp;
  @Input() patternErrMsg?: string;
  @Input() placeholder: string = DEFAULT_PLACEHOLDER;
  @Input() propertyDisplayName?: string;
  @Input() propertyKey = '';
  @Input() serverDriven = true;
  @Input() validator?: StringValidatorEnum;
  @Input() widthPx: number = DEFAULT_CONTAINER_WIDTH_PX;

  /* for client-driven data-grids only */
  @Input() fullMatch = false;

  @ViewChild('inputElement') inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild(ClrInput) clrInput?: ClrInput;

  configErrors: string[] = [];
  filterValue = '';
  readonly formControl = new FormControl<string>('', { nonNullable: true });
  readonly changes = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private clrDatagridFilterContainer: ClrDatagridFilter,
    private clrPopoverToggleService: ClrPopoverToggleService,
  ) {
    this.clrDatagridFilterContainer.setFilter(this);
  }

  get isValueTooShort(): boolean {
    return this.formControl.value.length < this.minLength;
  }

  get state(): FilterState<string> {
    return {
      property: this.propertyKey,
      value: this.filterValue || undefined,
    };
  }

  get validationErrorMessage(): string | undefined {
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

  accepts(item: T): boolean {
    if (this.serverDriven) {
      return false;
    }

    if (!item || typeof item !== 'object') {
      return false;
    }

    const propertyValue = (item as Record<string | number, unknown>)[this.propertyKey];

    if (typeof propertyValue !== 'string') {
      return false;
    }

    const propertyValueInLowerCase = propertyValue.toLowerCase();
    const filterValueInLowerCase = this.filterValue.toLowerCase();

    return this.fullMatch
      ? propertyValueInLowerCase === filterValueInLowerCase
      : propertyValueInLowerCase.includes(filterValueInLowerCase);
  }

  isActive(): boolean {
    return !!this.propertyKey && !!this.filterValue;
  }

  ngAfterViewInit(): void {
    this.clrPopoverToggleService.openChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen: boolean) => {
        if (!isOpen) {
          return;
        }
        if (this.formControl.value !== this.filterValue) {
          this.updateFormControlValue(this.filterValue);
          this.clrInput?.triggerValidation();
          this.changeDetectionRef.markForCheck();
        }
        setTimeout(() => this.focusInputElement());
      });
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

  onReset(): void {
    this.updateFormControlValue('');
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
      inputsErrors.push(`'[pattern] is required as [validator]="'pattern'"`);
    }
    if (this.pattern && this.validator !== StringValidatorEnum.PATTERN) {
      inputsErrors.push(`[pattern] is provided, but [validator] is not equal to 'pattern'`);
    }

    return inputsErrors;
  }

  private focusInputElement(): void {
    this.inputRef?.nativeElement.focus();
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

  private updateFilterValue(value: string): void {
    if (value !== this.filterValue) {
      this.filterValue = value;
      this.changes.next();
    }
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
