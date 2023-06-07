import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ClrDatagridFilterInterface, ClrTreeViewModule } from '@clr/angular';
import { areSetsEqual } from '@extrawest/extra-clarity/utils';
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
    if (selected === 0) {
      return 'none';
    }
    const total = this.options.reduce((sum, group) => sum + group.items.length, 0);
    return `${selected} out of ${total}`;
  }

  getSelectedAmountInGroup(group: EnumGroupFilterOption<E>): string {
    const selected = group.items.filter(item => this.selectedValues.has(item.value)).length;
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

    const newSelectedValues = new Set(this.selectedValues);

    this.options[groupIndex].items.forEach(item => {
      (event.target as HTMLInputElement).checked
        ? newSelectedValues.add(item.value)
        : newSelectedValues.delete(item.value);
    });

    this.updateSelectedValues(newSelectedValues);
  }

  onItemSelectedChange(event: Event, inputValue: E): void {
    event.stopPropagation();

    if (!event.target) {
      return;
    }

    const newSelectedValues = new Set(this.selectedValues);

    (event.target as HTMLInputElement).checked
      ? newSelectedValues.add(inputValue)
      : newSelectedValues.delete(inputValue);

    this.updateSelectedValues(newSelectedValues);
  }

  resetToDefault(): void {
    const newSelectedValues = new Set<E>();
    this.options.forEach(group => {
      group.items
        .filter(option => option.selectedByDefault)
        .forEach(option => newSelectedValues.add(option.value));
    });
    this.updateSelectedValues(newSelectedValues);
  }

  trackByValue(index: number, option: EnumFilterOption<E>): E {
    return option.value;
  }

  unselectAll(): void {
    this.updateSelectedValues(new Set<E>());
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
    if (this.propertyKey) {
      return;
    }
    return ['[propertyKey] is required'];
  }

  private forceSelection(selectValues: E[] | null): void {
    if (!selectValues || !this.areAllValuesAllowed(selectValues)) {
      this.resetToDefault();
      return;
    }

    const newSelectedValues = new Set<E>();
    selectValues.forEach(value => newSelectedValues.add(value));
    this.updateSelectedValues(newSelectedValues);
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

  private updateSelectedValues(
    newSelectedValues: Set<E>,
    params: { emit: boolean } = { emit: true },
  ): void {
    if (areSetsEqual(newSelectedValues, this.selectedValues, { ignoreOrder: true })) {
      return;
    }
    this.selectedValues = newSelectedValues;
    this.isStateDefault = this.checkIfStateIsDefault();
    if (params.emit) {
      this.selectionChanged.emit(this.state);
      this.changes.next();
    }
  }
}
