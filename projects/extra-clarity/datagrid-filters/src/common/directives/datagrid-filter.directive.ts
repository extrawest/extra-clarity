import { Directive } from '@angular/core';

import { ClrDatagridFilterInterface } from '@clr/angular';
import { Observable } from 'rxjs';

import { EcFilterState, EcResettableFilter } from '../interfaces/filter-state.interface';

@Directive()
export abstract class EcDatagridFilter<S = unknown, T extends object = object>
  implements ClrDatagridFilterInterface<T, EcFilterState<S>>, EcResettableFilter
{
  abstract accepts(item: T): boolean;
  abstract isActive(): boolean;
  abstract changes: Observable<unknown>;
  abstract readonly state: EcFilterState<S>;

  abstract clearSelection(): void;
  abstract resetToDefault(): void;
  abstract setValue(value: S): void;
}
