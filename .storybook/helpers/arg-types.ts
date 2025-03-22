import { type ArgTypes } from '@storybook/angular';
import { InputType } from 'storybook/internal/types';

type InputTypeControl = Required<Pick<InputType, 'control'>>;
type InputTypeTable = Required<Pick<InputType, 'table'>>;

export const hideControlInput: InputTypeControl = {
  control: false,
};

export const hideControlRow: InputTypeTable = {
  table: {
    disable: true,
  },
};

export const hideAutoGeneratedControlType: InputTypeTable = {
  table: {
    type: {
      // 'null as unknown as string' == workaround, as allowed values do not help:
      // - undefined -- has no effect
      // - '' -- shows an empty string as two single quotes
      summary: null as unknown as string,
    },
  },
};

export function hideAllControlRows<T extends {}>(
  metaArgTypes: Partial<ArgTypes<T>> | undefined
): { [metaArgTypesKey: string]: InputTypeTable } {
  if (!metaArgTypes) {
    return {};
  }
  return {
    ...Object.fromEntries(Object.keys(metaArgTypes).map((key) => [key, hideControlRow])),
  };
}
