import { EcEnumValueFilterOption } from './filter-state.interface';

export enum EcEnumValueFilterOptionCategoryBorder {
  Divider = 'divider',
  Margin = 'margin',
  None = 'none',
}

export interface EcEnumValueFilterOptionCategoryConfig {
  optionIndexStart: number;
  optionIndexEnd: number;
  label?: string;
  top?: EcEnumValueFilterOptionCategoryBorder;
  bottom?: EcEnumValueFilterOptionCategoryBorder;
}

export interface EcEnumValueFilterOptionCategory<E> {
  options: EcEnumValueFilterOption<E>[];
  label?: string;
  withDividerTop: boolean;
  withDividerBottom: boolean;
  withMarginTop: boolean;
  withMarginBottom: boolean;
}
