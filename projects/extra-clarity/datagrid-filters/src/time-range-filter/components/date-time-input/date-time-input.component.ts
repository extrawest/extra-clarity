import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClrInput, ClrInputModule } from '@clr/angular';
import { distinctUntilChanged } from 'rxjs';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { localDateRegEx, localDateTimeRegEx } from '@extrawest/extra-clarity/utils';

import { datetimeInputValidator } from './date-time-input.validators';

@Component({
  selector: 'ec-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ClrInputModule],
})
export class EcDateTimeInputComponent implements AfterViewInit, OnChanges, OnInit {
  @Input()
  public disabled: boolean = false;

  @Input()
  public label?: string;

  @Input()
  public value: string | null = null;

  @Input()
  public withTime: boolean = true;

  @Output()
  public valueChange = new EventEmitter<string>();

  protected readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('datetimeInput');

  protected readonly clrInputRef = viewChild.required(ClrInput);

  public readonly formControl = new FormControl<string>('', { nonNullable: true });

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngAfterViewInit(): void {
    this.formControl.addValidators(datetimeInputValidator(this.inputRef()));
    this.formControl.updateValueAndValidity();

    this.formControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue) => this.valueChange.emit(formValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) {
        this.formControl.disable({ emitEvent: false });
      } else {
        this.formControl.enable({ emitEvent: false });
      }
    }

    if (changes['value']) {
      this.updateValue(this.value ?? '');
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
    return !this.disabled && (formControl.value || formControl.invalid);
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

  private updateValue(value: string): void {
    if (this.formControl.value === value) {
      return;
    }

    if (!value) {
      this.formControl.setValue('');
      return;
    }

    const regEx = this.withTime ? localDateTimeRegEx : localDateRegEx;
    if (!regEx.test(value)) {
      return;
    }

    this.formControl.setValue(value);
  }
}
