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

export abstract class EcDatagridFilter<T extends object, S>
implements ClrDatagridFilterInterface<T, FilterState<S>> {
  abstract accepts(item: T): boolean;
  abstract isActive(): boolean;
  abstract changes: Observable<unknown>;
  abstract readonly state: FilterState<S>;

  abstract resetToDefault(): void;
}
