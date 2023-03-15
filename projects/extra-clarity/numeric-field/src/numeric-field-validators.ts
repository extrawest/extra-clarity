import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

export class NumericFieldValidators {
  static min(min: number, groupingSeparator = '.', decimalSeparator = ','): ValidatorFn {
    const validatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null;
      }
      const value: number = this.parseInputString(control.value, groupingSeparator, decimalSeparator);
      return !isNaN(value) && value < min ? { min: { min, actual: value } } : null;
    };
    return validatorFn;
  }

  static max(max: number, groupingSeparator = '.', decimalSeparator = ','): ValidatorFn {
    const validatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null;
      }
      const value: number = this.parseInputString(control.value, groupingSeparator, decimalSeparator);
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
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxNumeric, multi: true }],
})
export class MaxNumeric implements Validator {
  @Input('maxNumeric') _max: number;
  @Input('groupingSep') _groupingSep = '.';
  @Input('decimalSep') _decimalSep = ',';

  validate(control: AbstractControl): { [key: string]: any } | null {
    return NumericFieldValidators.max(this._max, this._groupingSep, this._decimalSep)(control);
  }
}

@Directive({
  selector: '[minNumeric]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinNumeric, multi: true }],
})
export class MinNumeric implements Validator {
  @Input('minNumeric') _min: number;
  @Input('groupingSep') _groupingSep = '.';
  @Input('decimalSep') _decimalSep = ',';

  validate(control: AbstractControl): { [key: string]: any } | null {
    return NumericFieldValidators.min(this._min, this._groupingSep, this._decimalSep)(control);
  }
}
