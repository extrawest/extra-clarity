export interface FilterState<T = unknown> {
  property: string | number;
  value: T | undefined;
}

export interface EnumFilterOption<T = unknown> {
  value: T;
  label?: string;
  selectedByDefault?: boolean;
}

export interface EnumGroupFilterOption<T = unknown> {
  label: string;
  items: readonly EnumFilterOption<T>[];
  expandedByDefault?: boolean;
}
