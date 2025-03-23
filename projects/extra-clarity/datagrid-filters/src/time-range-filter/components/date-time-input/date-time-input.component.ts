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
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClrInput, ClrInputModule } from '@clr/angular';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { Subject, takeUntil } from 'rxjs';

import { datetimeInputValidator } from './date-time-input.validators';

@Component({
  selector: 'ec-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ClrInputModule],
})
export class EcDateTimeInputComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  @Input()
  public disabled: boolean = false;

  @Input()
  public label?: string;

  @Input()
  public value: number | null = null;

  @Input()
  public withTime: boolean = true;

  @Output()
  public valueChange: EventEmitter<number | null> = new EventEmitter();

  @ViewChild('datetimeInput', { static: true })
  protected inputRef?: ElementRef<HTMLInputElement>;

  @ViewChild(ClrInput, { static: true })
  protected clrInputRef?: ClrInput;

  public inputType = this.inputDateType;

  public readonly formControl = new FormControl<string>('', {
    nonNullable: true,
  });

  private readonly destroy$ = new Subject<void>();

  get inputDateType(): string {
    return this.withTime ? 'datetime-local' : 'date';
  }

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    if (this.inputRef) {
      this.formControl.addValidators(datetimeInputValidator(this.inputRef));
      this.formControl.updateValueAndValidity();
    }

    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((formValue) => {
      this.valueChange.emit(this.convertFromFormValue(formValue));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.disabled
        ? this.formControl.disable({ emitEvent: false })
        : this.formControl.enable({ emitEvent: false });
    }

    if (changes['value'] && this.value !== undefined) {
      this.updateFormValue(this.value);
    }

    if (changes['withTime']) {
      this.inputType = this.withTime ? 'datetime-local' : 'date';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  restoreInputValue(): void {
    // This method should be called outside of this component to clean up an invalid entered value
    this.formControl.setValue(this.formControl.value, { emitEvent: false });
    this.formControl.updateValueAndValidity();
  }

  protected isInputDirty(formControl: FormControl): boolean {
    return !this.disabled && (formControl.value || formControl.invalid);
  }

  protected validateOnBlur(): void {
    // This additional validation is needed to show errors for partially entered values,
    // or for entering a complete but invalid date (e.g. 31 Feb),
    // as the form control value remains empty until all the fields are filled with correct values

    if (this.formControl.value) return;

    this.formControl.updateValueAndValidity({ emitEvent: false });
    this.clrInputRef?.triggerValidation();
    this.changeDetectorRef.markForCheck();
  }

  private convertIntoFormValue(timestampAsNumber: number | null): string {
    if (timestampAsNumber === null) {
      return '';
    }

    const date = new Date(timestampAsNumber);
    const isDateInvalid = isNaN(date.getTime());

    if (isDateInvalid) return '';

    // Compose a string compatible with 'datetime-local' input element's value: 'YYYY-MM-DDThh:mm'

    const YYYY = date.getFullYear().toString().padStart(4, '0');
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const DD = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');

    return this.withTime ? `${YYYY}-${MM}-${DD}T${hh}:${mm}` : `${YYYY}-${MM}-${DD}`;
  }

  private convertFromFormValue(timestampAsString: string): number | null {
    if (!timestampAsString) {
      return null;
    }
    const date = new Date(timestampAsString).getTime();
    return isNaN(date) ? null : date;
  }

  private updateFormValue(value: number | null): void {
    const formValue = this.convertIntoFormValue(value);
    if (this.formControl.value !== formValue) {
      this.formControl.setValue(formValue);
    }
  }
}
