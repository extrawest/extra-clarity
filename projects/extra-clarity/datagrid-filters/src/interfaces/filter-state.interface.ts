export interface FilterState<T> {
  property: string | number;
  value: T;
}

export interface EnumValueFilterOption<E> {
  value: E;
  label: string;
  selectedByDefault?: boolean;
}

export interface EnumValueFilterOptionGroup<E> {
  label: string;
  expandedByDefault?: boolean;
  items: readonly EnumValueFilterOption<E>[];
}

export abstract class ResettableFilter {
  abstract resetToDefault: () => void;
}
