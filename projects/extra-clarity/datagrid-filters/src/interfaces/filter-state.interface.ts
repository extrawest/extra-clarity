export interface FilterState<T> {
  property: string | number;
  value: T;
}

export interface EnumValueFilterOption<E> {
  value: E;
  label?: string;
  selectedByDefault?: boolean;
}

export interface EnumGroupedValueFilterOption<E> {
  label: string;
  items: readonly EnumValueFilterOption<E>[];
  expandedByDefault?: boolean;
}
