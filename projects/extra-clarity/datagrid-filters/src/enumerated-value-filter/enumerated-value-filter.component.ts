import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ClrCheckboxModule, ClrDatagridFilter, ClrDatagridFilterInterface, ClrRadioModule } from '@clr/angular';
import { Observable, Subject } from 'rxjs';

import { FilterState } from '../interfaces/filter-state.interface';

const DEFAULT_MIN_LENGTH = 200;

export interface EnumFilterValue {
  label: string | number;
  value: any;
  selected?: boolean;
}

@Component({
  selector: 'ec-enumerated-value-filter',
  templateUrl: './enumerated-value-filter.component.html',
  styleUrls: ['./enumerated-value-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrRadioModule,
    ClrCheckboxModule,
  ],
})
export class EnumeratedValueFilterComponent<T extends { [key: string]: string | number }>
implements ClrDatagridFilterInterface<T, FilterState<string | string[]>>, OnInit {
  @Input() public width = DEFAULT_MIN_LENGTH;
  @Input() public propertyKey: string;
  @Input() public propertyDisplayName?: string;
  @Input() public serverDriven = true;
  @Input() public customLabelTpl: TemplateRef<any>;
  @Input() public multiple: boolean;
  @Input() public set values(filters: EnumFilterValue[]) {
    this.filters = filters;
    this.defaultFiltersValues = filters;
  }

  @Output() public readonly valuesChange = new EventEmitter<EnumFilterValue[]>();

  filters: EnumFilterValue[] = [];
  defaultFiltersValues: EnumFilterValue[] = [];

  isDirty = false;

  private readonly changesSubject$ = new Subject<void>();

  constructor(private readonly clrDatagridFilter: ClrDatagridFilter) {}

  public get changes(): Observable<void> {
    return this.changesSubject$.asObservable();
  }

  public ngOnInit(): void {
    this.clrDatagridFilter.setFilter(this);
  }

  public isActive(): boolean {
    return this.serverDriven ? this.isDirty : !!this.propertyKey && this.isDirty;
  }

  public get hasSelectedItem(): boolean {
    return this.filters.some(({ selected }) => selected);
  }

  public accepts(item: T): boolean {
    if (this.serverDriven) {
      return true;
    }

    if (!Object(item).hasOwnProperty(this.propertyKey)) {
      return false;
    }

    const propertyValue = item[this.propertyKey as keyof typeof item];

    if (!this.filters.some(({ selected }) => selected)) {
      return true;
    }

    return this.filters.some((filter) => filter.selected && (filter.value === propertyValue || filter.label === propertyValue));
  }

  public onSelect(filter: EnumFilterValue): void {
    if (this.multiple) {
      this.filters = this.filters.map((item) => {
        if (item.value === filter.value) {
          return { ...item, selected: !filter.selected };
        }
        return item;
      });
      this.isDirty = true;
    } else {
      if (filter.selected) {
        return;
      }

      this.filters = this.filters.map((item) => ({ ...item, selected: item === filter }));
    }

    this.isDirty = true;
    this.changesSubject$.next();
    this.valuesChange.emit(this.filters);
  }

  public onReset(): void {
    this.filters = this.defaultFiltersValues;
    this.changesSubject$.next();
  }

  public onClear(): void {
    this.filters = this.filters.map((filter) => ({ ...filter, selected: false }));
    this.changesSubject$.next();
  }

  public get state(): FilterState<string | string[]> {
    const value = this.getSelectedFiltersValue();
    return {
      property: this.propertyKey,
      value: this.multiple ? value : value[0],
    };
  }

  trackByValue(index: number, item: EnumFilterValue): any {
    return item.value;
  }

  private getSelectedFiltersValue(): string[] {
    return this.filters.reduce((result: string[], filter) => {
      if (filter.selected) {
        result.push(filter.value);
      }
      return result;
    }, []);
  }
}
