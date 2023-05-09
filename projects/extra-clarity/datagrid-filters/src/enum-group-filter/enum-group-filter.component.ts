import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ClrDatagridFilterInterface, ClrTreeViewModule } from '@clr/angular';
import { Subject } from 'rxjs';

import { EnumFilterOption, EnumGroupFilterOption, FilterState } from '../interfaces/filter-state.interface';

const DEFAULT_MAX_HEIGHT_PX = 300;
const DEFAULT_WIDTH_PX = 200;

@Component({
  selector: 'ec-enum-group-filter',
  templateUrl: './enum-group-filter.component.html',
  styleUrls: ['./enum-group-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrTreeViewModule,
  ],
})
export class EnumGroupFilterComponent<T, E>
implements ClrDatagridFilterInterface<T, FilterState<E[]>>, OnChanges, OnDestroy, OnInit {
  @Input() heightPx: number = DEFAULT_MAX_HEIGHT_PX;
  @Input() widthPx: number = DEFAULT_WIDTH_PX;

  @Input() propertyKey = '';
  @Input() title?: string;
  @Input() showSelectedAmount = false;
  @Input() customLabelTpl?: TemplateRef<unknown>;

  @Input() loading = false;
  @Input() expandedAll?: boolean;
  @Input() options: readonly EnumGroupFilterOption<E>[] = [];
  @Input() selectValues: E[] | null | undefined;

  @Output() selectionChanged = new EventEmitter<FilterState<E[]>>();

  configErrors?: string[];
  hasCustomDefaultState = false;
  isGroupExpanded: boolean[] = [];
  isStateDefault = true;
  selectedValues = new Set<E>();

  readonly changes = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  get state(): FilterState<E[]> {
    const value = this.selectedValues.size > 0
      ? Array.from(this.selectedValues)
      : undefined;

    return {
      property: this.propertyKey,
      value,
    };
  }

  accepts(item: T): boolean {
    return false;
  }

  getSelectedAmountTotal(): string {
    const selected = this.selectedValues.size;
    const total = this.options.reduce((sum, group) => sum + group.items.length, 0);
    return (selected === 0) ? 'none' : `${selected} out of ${total}`;
  }

  getSelectedAmountInGroup(group: EnumGroupFilterOption<E>): string {
    const selected = group.items.filter(item => this.selectedValues.has(item.value as E)).length;
    const total = group.items.length;
    return `${selected}/${total}`;
  }

  isActive(): boolean {
    return !!this.propertyKey && !this.isStateDefault;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.onOptionsChange();
      return;
    }

    if (changes['selectValues'] && this.selectValues !== undefined) {
      this.forceSelection(this.selectValues);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.configErrors = this.checkInputsValidity();
  }

  onGroupSelectedChange(event: Event, groupIndex: number): void {
    if (!event.target) {
      return;
    }

    this.options[groupIndex].items.forEach(item => {
      (event.target as HTMLInputElement).checked
        ? this.selectedValues.add(item.value)
        : this.selectedValues.delete(item.value);
    });

    this.onFilterStateUpdate();
  }

  onItemSelectedChange(event: Event, inputValue: E): void {
    event.stopPropagation();

    if (!event.target) {
      return;
    }

    (event.target as HTMLInputElement).checked
      ? this.selectedValues.add(inputValue)
      : this.selectedValues.delete(inputValue);

    this.onFilterStateUpdate();
  }

  resetToDefault(): void {
    this.selectedValues.clear();
    this.options.forEach(group => {
      group.items
        .filter(option => option.selectedByDefault)
        .forEach(option => this.selectedValues.add(option.value));
    });
    this.onFilterStateUpdate();
  }

  trackByValue(index: number, option: EnumFilterOption<E>): E {
    return option.value;
  }

  unselectAll(): void {
    this.selectedValues.clear();
    this.onFilterStateUpdate();
  }

  private areAllValuesAllowed(filterValues: E[]): boolean {
    if (filterValues.length === 0) {
      return true;
    }
    return filterValues.every(value => {
      return this.options.some(group => group.items.some(option => option.value === value));
    });
  }

  private checkIfStateIsDefault(): boolean {
    return this.options.every(group => {
      return group.items.every(option => {
        return !!option.selectedByDefault === this.selectedValues.has(option.value);
      });
    });
  }

  private checkInputsValidity(): string[] | undefined {
    const inputsErrors: string[] = [];

    if (!this.propertyKey) {
      inputsErrors.push('[propertyKey] is required');
    }

    return (inputsErrors.length > 0) ? inputsErrors : undefined;
  }

  private forceSelection(selectValues: E[] | null): void {
    if (!selectValues || !this.areAllValuesAllowed(selectValues)) {
      this.resetToDefault();
      return;
    }

    this.selectedValues.clear();
    selectValues.forEach(value => this.selectedValues.add(value));
    this.onFilterStateUpdate();
  }

  private onFilterStateUpdate(params: { emit: boolean } = { emit: true }): void {
    this.isStateDefault = this.checkIfStateIsDefault();
    if (params.emit) {
      this.selectionChanged.emit(this.state);
      this.changes.next();
    }
  }

  private onOptionsChange(): void {
    this.hasCustomDefaultState = this.options.some(group => {
      return group.items.some(option => option.selectedByDefault);
    });

    this.isGroupExpanded = this.options.map(group => this.expandedAll ?? group.expandedByDefault ?? false);

    if (this.selectValues === undefined) {
      this.resetToDefault();
      return;
    }

    this.forceSelection(this.selectValues);
  }
}
