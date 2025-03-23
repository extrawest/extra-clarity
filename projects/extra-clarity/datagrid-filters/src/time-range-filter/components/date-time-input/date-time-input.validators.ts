import { ElementRef } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const badInputError = {
  badInput: true,
} as const;

export function datetimeInputValidator(inputEl: ElementRef<HTMLInputElement>): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    // TODO: extend validation errors with the 'out-of-range' case when
    // (validity.rangeOverflow || validity.rangeUnderflow)

    if (
      !inputEl.nativeElement.validity.valid ||
      (control.value && isNaN(new Date(control.value).getTime()))
    ) {
      return badInputError;
    }

    return null;
  };
}
