import { Directive } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { Observable } from 'rxjs';

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

export interface ResettableFilter {
  resetToDefault: () => void;
}

@Directive()
export abstract class EcDatagridFilter<S = unknown, T extends object = {}>
implements ClrDatagridFilterInterface<T, FilterState<S>>, ResettableFilter {
  abstract accepts(item: T): boolean;
  abstract isActive(): boolean;
  abstract changes: Observable<unknown>;
  abstract readonly state: FilterState<S>;

  abstract clearSelection(): void;
  abstract resetToDefault(): void;
  abstract setValue(value: S): void;
}
