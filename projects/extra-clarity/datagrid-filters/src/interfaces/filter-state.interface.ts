export interface FilterState<T> {
  property: string | number;
  value: T | undefined;
}

export interface EnumFilterOption<E> {
  value: E;
  label?: string;
  selectedByDefault?: boolean;
}

export interface EnumGroupFilterOption<E> {
  label: string;
  items: readonly EnumFilterOption<E>[];
  expandedByDefault?: boolean;
}
