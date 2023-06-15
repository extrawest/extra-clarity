export interface FilterState<T> {
  property: string | number;
  value: T | undefined;
}

export interface EnumFilterOption<E> {
  value: E;
  label?: string;
  selectedByDefault?: boolean;
}

export interface EnumGroupFilterOption<T> {
  label: string;
  items: readonly EnumFilterOption<T>[];
  expandedByDefault?: boolean;
}
