import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ClrCheckboxModule, ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { areSetsEqual } from '@extrawest/extra-clarity/utils';
import { Subject } from 'rxjs';

import { EnumFilterOption, FilterState } from '../interfaces/filter-state.interface';

export const ENUM_MULTI_VALUE_FILTER_DEFAULTS = {
  maxHeightPx: 300,
  widthPx: 200,
} as const;

@Component({
  selector: 'ec-enum-multi-value-filter',
  templateUrl: './enum-multi-value-filter.component.html',
  styleUrls: ['./enum-multi-value-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrCheckboxModule,
  ],
})
export class EnumMultiValueFilterComponent<E, T extends object = {}>
implements ClrDatagridFilterInterface<T, FilterState<E[] | null>>, OnChanges, OnDestroy, OnInit {
  /**
   * TemplateRef for a template to use as a custom option label.
   * May be useful to show icons within an option label or to apply a custom format to it.
   *
   * The entire `option` object is passed to this template as the $implicit context parameter.
   */
  @Input()
  public customLabelTpl?: TemplateRef<unknown>;

  /**
   * Show a placeholder 'Loading, please wait...' to inform users
   * that the list of options is loading
   */
  @Input()
  public loading = false;

  /**
   * Configure client-driven filtering for cells containing an array of values:
   * * 'all' = pass filtering if the cell content includes all the selected values;
   * * 'exact' = pass filtering if the cell content is exactly equal to the selected values;
   * * 'any' = pass filtering if the cell content contains at least one of the selected values.
   *
   * NOTE: Affects only client-driven filters, i.e. requires another input `[serverDriven]="false"`.
   */
  @Input()
  public matchSelected: 'all' | 'exact' | 'any' = 'any';

  /**
   * Max height (in pixels) of the option list container.
   * If the container's content exceeds the limit, a vertical scrollbar is shown.
   * */
  @Input()
  public maxHeightPx: number = ENUM_MULTI_VALUE_FILTER_DEFAULTS.maxHeightPx;

  /**
   * List of options to select from. Each option contains:
   * * `value`: a value of any type `<E>` to be added to the cumulative filter value on selecting this option;
   *   values must be unique among all options
   * * `label`: an optional string label for the option;
   *   if not provided, then the stringified `value` is shown as a label
   * * `selectedByDefault`: an optional boolean flag to mark the options selected by default,
   *   i.e. to define a custom default state of the filter;
   *   when not provided for any option, the default state is empty (null).
   *
   * NOTE: The parent `<clr-datagrid>` component treats the default filter's state as inactive
   * and ignores the actual filter's value in that case. So, if you set a custom default value,
   * you have to provide additional logic for the datagrid's `(clrDgRefresh)` handler to perform proper filtering.
   *
   * @required
   */
  @Input()
  public options: EnumFilterOption<E>[] = [];

  /**
   * When `[serverDriven]="true"`, it's a free-form identifier defined by a developer, that will be shown as `property`
   * in the output state to help identify the filter's state amidst another filters;
   *
   * When `[serverDriven]="false"`, it must be equal to the name of a field in the object passed to the `[clrDgItem]`
   * input on `<clr-dg-row>` to filter by, i.e. to decide whether a row should be shown or not.
   *
   * @required
   */
  @Input()
  public propertyKey = '';

  /**
   * Whether the filter and the datagrid are server-driven:
   * * `true` = filtering is processed externally (e.g. by a backend), not by the filter.
   * * `false` = filtering is processed by the filter's `accepts()` method.
   *
   * @required
   */
  @Input()
  public serverDriven = true;

  /**
   * Whether to show a label with amount of selected items above the option list.
   * May be useful for a long list of options.
   */
  @Input()
  public showSelectedAmount = false;

  /**
   * Optional label to show above the option list
   */
  @Input()
  public title?: string;

  /**
   * A value to be set as the actual filter's value on this input change or on `[options]` change.
   *
   * If any provided value is not included in the values within the option list,
   * the filter state will be reset to default.
   *
   * Providing `null` will clear the current selection, and `undefined` will be ignored.
   * */
  @Input()
  public value: E[] | null | undefined;

  /**
   * Width (in pixels) of the filter's container
   * */
  @Input()
  public widthPx: number = ENUM_MULTI_VALUE_FILTER_DEFAULTS.widthPx;

  /**
   * Emits the filter's state object on every change of the internal filter value.
   * The state object contains the name of a `property` to filter by, defined by the `[propertyKey]` input,
   * and the actual filter `value`.
   *
   * The same object is emitted by the `(clrDgRefresh)` output of the `<clr-datagrid>` parent component
   * for all non-default filter values.
   *
   * `EventEmitter<FilterState<E[] | null>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<FilterState<E[] | null>>();

  protected configErrors: string[] = [];
  protected hasCustomDefaultState = false;
  protected isStateDefault = true;
  protected selectedValues = new Set<E>();

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  readonly changes = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  private readonly clrDatagridFilterContainer = inject(ClrDatagridFilter, { optional: true });

  constructor() {
    this.clrDatagridFilterContainer?.setFilter(this);
  }

  /**
   * Get the actual filter state in the same shape as it's emitted to the parent datagrid.
   *
   * @see {@link filterValueChanged} for more details
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  get state(): FilterState<E[] | null> {
    const filterValue = this.selectedValues.size > 0
      ? Array.from(this.selectedValues)
      : null;

    return {
      property: this.propertyKey,
      value: filterValue,
    };
  }

  protected get selectedAmountLabel(): string {
    const selected = this.selectedValues.size;
    if (selected === 0) {
      return 'none';
    }
    const total = this.options.length;
    return `${selected} out of ${total}`;
  }

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  accepts(item: T): boolean {
    if (this.serverDriven || !item || typeof item !== 'object' || !this.propertyKey) {
      return false;
    }

    if (this.selectedValues.size === 0) {
      return true;
    }

    const propertyValue = (item as Record<string | number, unknown>)[this.propertyKey];

    if (propertyValue == null) {
      return false;
    }

    const isArray = Array.isArray(propertyValue);

    if (typeof propertyValue === 'object' && !isArray) {
      return false;
    }

    const selectedValues = Array.from(this.selectedValues);

    if (!isArray) {
      return selectedValues.includes(propertyValue as E);
    }

    if (this.matchSelected === 'exact') {
      return areSetsEqual(new Set(propertyValue), this.selectedValues, { ignoreOrder: true });
    }

    if (this.matchSelected === 'all') {
      return selectedValues.every(selectedValue => propertyValue.includes(selectedValue));
    }

    return selectedValues.some(selectedValue => propertyValue.includes(selectedValue));
  }

  /**
   * Indicate whether the filter is active, i.e. has a non-default value selected.
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  isActive(): boolean {
    return !!this.propertyKey && !this.isStateDefault;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.onOptionsChange();
      return;
    }
    if (changes['value'] && this.value !== undefined) {
      this.setValue(this.value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.configErrors = this.checkInputsValidity();
  }

  /**
   * Reset the filter to the default state
   * */
  resetToDefault(): void {
    this.updateSelectedValues(new Set(
      this.options
        .filter(option => option.selectedByDefault)
        .map(option => option.value),
    ));
  }

  /**
   * Set a new value as the actual filter's value.
   *
   * If any provided value is not included in the values within the option list,
   *   the filter state will be reset to default.
   *
   * Providing `null` will clear the current selection, which is equivalent to calling `unselectAll()`.
   * */
  setValue(values: E[] | null): void {
    if (!values || !this.areAllValuesAllowed(values)) {
      this.resetToDefault();
      return;
    }
    this.updateSelectedValues(new Set(values));
  }

  /**
   * Reset the filter to the empty state
   * */
  unselectAll(): void {
    this.updateSelectedValues(new Set());
  }

  protected onInputChange(event: Event, inputValue: E): void {
    if (!event.target) {
      return;
    }

    const newSelectedValues = new Set(this.selectedValues);

    (event.target as HTMLInputElement).checked
      ? newSelectedValues.add(inputValue)
      : newSelectedValues.delete(inputValue);

    this.updateSelectedValues(newSelectedValues);
  }

  protected trackByValue(index: number, option: EnumFilterOption<E>): E {
    return option.value;
  }

  private areAllValuesAllowed(filterValues: E[]): boolean {
    return filterValues.length > 0
      ? filterValues.every(value => this.options.some(option => option.value === value))
      : true;
  }

  private checkIfStateIsDefault(): boolean {
    return this.options.every(option => {
      return (!!option.selectedByDefault) === this.selectedValues.has(option.value);
    });
  }

  private checkInputsValidity(): string[] {
    if (this.propertyKey) {
      return [];
    }
    return ['[propertyKey] is required'];
  }

  private onOptionsChange(): void {
    this.isStateDefault = this.checkIfStateIsDefault();
    this.hasCustomDefaultState = this.options.some(option => option.selectedByDefault);

    if (this.value !== undefined) {
      this.setValue(this.value);
      return;
    }

    if (this.selectedValues.size === 0) {
      this.resetToDefault();
      return;
    }

    this.setValue(Array.from(this.selectedValues));
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
      this.filterValueChanged.emit(this.state);
      this.changes.next();
    }
  }
}