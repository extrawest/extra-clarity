import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  input,
  output,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClrInput, ClrInputModule } from '@clr/angular';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';

import { datetimeInputValidator } from './date-time-input.validators';

@Component({
  selector: 'ec-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ClrInputModule],
})
export class EcDateTimeInputComponent implements AfterViewInit, OnChanges, OnInit {
  public readonly disabled = input<boolean>(false);
  public readonly label = input<string>();
  public readonly value = input<number | null>(null);
  public readonly withTime = input<boolean>(true);

  public readonly valueChange = output<number | null>();

  protected readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('datetimeInput');
  protected readonly clrInputRef = viewChild.required(ClrInput);

  public inputType = this.inputDateType;

  public readonly formControl = new FormControl<string>('', {
    nonNullable: true,
  });

  get inputDateType(): string {
    return this.withTime() ? 'datetime-local' : 'date';
  }

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngAfterViewInit(): void {
    this.formControl.addValidators(datetimeInputValidator(this.inputRef()));
    this.formControl.updateValueAndValidity();

    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue) => {
        this.valueChange.emit(this.convertFromFormValue(formValue));
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled()) {
        this.formControl.disable({ emitEvent: false });
      } else {
        this.formControl.enable({ emitEvent: false });
      }
    }

    const value = this.value();
    if (changes['value'] && value !== undefined) {
      this.updateFormValue(value);
    }

    if (changes['withTime']) {
      this.inputType = this.withTime() ? 'datetime-local' : 'date';
    }
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  restoreInputValue(): void {
    // This method should be called outside of this component to clean up an invalid entered value
    this.formControl.setValue(this.formControl.value, { emitEvent: false });
    this.formControl.updateValueAndValidity();
  }

  protected isInputDirty(formControl: FormControl): boolean {
    return !this.disabled() && (formControl.value || formControl.invalid);
  }

  protected validateOnBlur(): void {
    // This additional validation is needed to show errors for partially entered values,
    // or for entering a complete but invalid date (e.g. 31 Feb),
    // as the form control value remains empty until all the fields are filled with correct values

    if (this.formControl.value) return;

    this.formControl.updateValueAndValidity({ emitEvent: false });
    this.clrInputRef().triggerValidation();
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

    return this.withTime() ? `${YYYY}-${MM}-${DD}T${hh}:${mm}` : `${YYYY}-${MM}-${DD}`;
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
