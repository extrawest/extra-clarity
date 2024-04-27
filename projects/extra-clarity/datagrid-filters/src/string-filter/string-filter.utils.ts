import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export enum EcValidationErrorEnum {
  EMAIL = 'email',
  MAX_LENGTH = 'maxlength',
  MIN_LENGTH = 'minlength',
  PATTERN = 'pattern',
  UUID = 'uuid',
}

export enum EcStringValidatorEnum {
  EMAIL = 'email',
  PATTERN = 'pattern',
  UUID = 'uuid',
}

const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    if (!control.value || uuidRegExp.test(control.value)) {
      return null;
    }
    return {
      [EcValidationErrorEnum.UUID]: true,
    };
  };
}
