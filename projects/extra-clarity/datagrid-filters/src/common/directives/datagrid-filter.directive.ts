import { Directive } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { Observable } from 'rxjs';

import { FilterState, ResettableFilter } from '../interfaces/filter-state.interface';

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
