import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export enum ValidationErrorEnum {
  EMAIL = 'email',
  MAX_LENGTH = 'maxlength',
  MIN_LENGTH = 'minlength',
  PATTERN = 'pattern',
  UUID = 'uuid',
}

export enum StringValidatorEnum {
  EMAIL = 'email',
  PATTERN = 'pattern',
  UUID = 'uuid',
}

const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gi;

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    if (!control.value || control.value.match(uuidRegExp)) {
      return null;
    }
    return {
      [ValidationErrorEnum.UUID]: true,
    };
  };
}
