export interface EcFilterState<T> {
  property: string | number;
  value: T;
}

export interface EcEnumValueFilterOption<E> {
  value: E;
  label: string;
  selectedByDefault?: boolean;
}

export interface EcEnumValueFilterOptionGroup<E> {
  label: string;
  expandedByDefault?: boolean;
  items: readonly EcEnumValueFilterOption<E>[];
}

export interface EcResettableFilter {
  resetToDefault: () => void;
}
