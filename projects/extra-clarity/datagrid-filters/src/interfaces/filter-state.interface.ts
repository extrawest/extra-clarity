export interface FilterState<T> {
  property: string | number;
  value: T | undefined;
}

export interface EnumFilterOption<T> {
  value: T;
  label?: string;
  selectedByDefault?: boolean;
}

export interface EnumGroupFilterOption<T> {
  label: string;
  items: readonly EnumFilterOption<T>[];
  expandedByDefault?: boolean;
}
