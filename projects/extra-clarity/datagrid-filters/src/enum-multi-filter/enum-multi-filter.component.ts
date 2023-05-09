import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ClrCheckboxModule, ClrDatagridFilterInterface } from '@clr/angular';
import { Subject } from 'rxjs';

import { EnumFilterOption, FilterState } from '../interfaces/filter-state.interface';

const DEFAULT_MAX_HEIGHT_PX = 300;
const DEFAULT_WIDTH_PX = 200;

@Component({
  selector: 'ec-enum-multi-filter',
  templateUrl: './enum-multi-filter.component.html',
  styleUrls: ['./enum-multi-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrCheckboxModule,
  ],
})
export class EnumMultiFilterComponent<T, E>
implements ClrDatagridFilterInterface<T, FilterState<E[]>>, OnChanges, OnDestroy, OnInit {
  @Input() heightPx: number = DEFAULT_MAX_HEIGHT_PX;
  @Input() widthPx: number = DEFAULT_WIDTH_PX;

  @Input() propertyKey = '';
  @Input() title?: string;
  @Input() showSelectedAmount = false;
  @Input() customLabelTpl?: TemplateRef<unknown>;

  @Input() loading = false;
  @Input() options: EnumFilterOption<E>[] = [];
  @Input() selectValues: E[] | null | undefined;

  @Output() selectionChanged = new EventEmitter<FilterState<E[]>>();

  configErrors?: string[];
  hasCustomDefaultState = false;
  isStateDefault = true;
  selectedValues = new Set<E>();

  readonly changes = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  get selectedAmount(): string {
    const selected = this.selectedValues.size;
    const total = this.options.length;
    return (selected === 0) ? 'none' : `${selected} out of ${total}`;
  }

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

  onInputChange(event: Event, inputValue: E): void {
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
    this.options
      .filter(option => option.selectedByDefault)
      .forEach(option => this.selectedValues.add(option.value));
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
    return filterValues.length > 0
      ? filterValues.every(value => this.options.some(option => option.value === value))
      : true;
  }

  private checkIfStateIsDefault(): boolean {
    return this.options.every(option => {
      return !!option.selectedByDefault === this.selectedValues.has(option.value);
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
    this.hasCustomDefaultState = this.options.some(option => option.selectedByDefault);

    if (this.selectValues === undefined) {
      this.resetToDefault();
      return;
    }

    this.forceSelection(this.selectValues);
  }
}
