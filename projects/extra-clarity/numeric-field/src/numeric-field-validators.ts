import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

export class NumericFieldValidators {
  static min(min: number, groupingSeparator = '.', decimalSeparator = ','): ValidatorFn {
    const validatorFn: ValidatorFn = (control: AbstractControl<string>): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null;
      }
      const value: number = this.parseInputString(control.value as string, groupingSeparator, decimalSeparator);
      return !isNaN(value) && value < min ? { min: { min, actual: value } } : null;
    };
    return validatorFn;
  }

  static max(max: number, groupingSeparator = '.', decimalSeparator = ','): ValidatorFn {
    const validatorFn: ValidatorFn = (control: AbstractControl<string>): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null;
      }
      const value: number = this.parseInputString(control.value as string, groupingSeparator, decimalSeparator);
      return !isNaN(value) && value > max ? { max: { max, actual: value } } : null;
    };
    return validatorFn;
  }

  private static parseInputString(value: string, groupingSeparator: string, decimalSeparator: string): number {
    if (typeof value !== 'string') {
      return parseFloat(value);
    }
    const notGroupedNumber: string = value.replace(new RegExp('[' + groupingSeparator + ']', 'g'), '');
    const formattedNumber: string = notGroupedNumber.replace(new RegExp('[' + decimalSeparator + ']', 'g'), '.');
    return parseFloat(formattedNumber);
  }
}

@Directive({
  selector: '[maxNumeric]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxNumericDirective, multi: true }],
})
export class MaxNumericDirective implements Validator {
  @Input() maxNumeric: number;
  @Input() groupingSep = '.';
  @Input() decimalSep = ',';

  validate(control: AbstractControl): { [key: string]: any } | null {
    return NumericFieldValidators.max(this.maxNumeric, this.groupingSep, this.decimalSep)(control);
  }
}

@Directive({
  selector: '[minNumeric]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinNumericDirective, multi: true }],
})
export class MinNumericDirective implements Validator {
  @Input() minNumeric: number;
  @Input() groupingSep = '.';
  @Input() decimalSep = ',';

  validate(control: AbstractControl): { [key: string]: any } | null {
    return NumericFieldValidators.min(this.minNumeric, this.groupingSep, this.decimalSep)(control);
  }
}
