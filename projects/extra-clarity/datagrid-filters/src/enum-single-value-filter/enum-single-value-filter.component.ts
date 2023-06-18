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
import { ClrDatagridFilter, ClrDatagridFilterInterface, ClrRadioModule } from '@clr/angular';
import { Subject } from 'rxjs';

import { EnumValueFilterOption, FilterState } from '../interfaces/filter-state.interface';

export const ENUM_SINGLE_VALUE_FILTER_DEFAULTS = {
  maxHeightPx: 300,
  widthPx: 200,
} as const;

@Component({
  selector: 'ec-enum-single-value-filter',
  templateUrl: './enum-single-value-filter.component.html',
  styleUrls: ['./enum-single-value-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrRadioModule,
  ],
})
export class EnumSingleValueFilterComponent<E, T extends object = {}>
implements ClrDatagridFilterInterface<T, FilterState<E | null>>, OnChanges, OnDestroy, OnInit {
  /**
   * Optional `TemplateRef` for a template to use as a custom option label.
   * May be useful to show icons within an option label or to apply a custom format to it.
   *
   * The entire `option: EnumValueFilterOption<E>` object is passed to this template
   * as the `$implicit` context parameter.
   *
   * `TemplateRef<unknown>`
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
   * Max height in pixels of the option list container.
   * If the container's content exceeds the limit, a vertical scrollbar is shown.
   * */
  @Input()
  public maxHeightPx: number = ENUM_SINGLE_VALUE_FILTER_DEFAULTS.maxHeightPx;

  /**
   * List of options to select from. Each option contains:
   * * `value`: a value of any type `<E>` to be used as a new filter value on selecting this option;
   *   values must be unique among all options
   * * `label`: an optional string label for the option;
   *   if not provided, then the stringified `value` is shown as a label
   * * `selectedByDefault`: an optional boolean flag to mark the option selected by default,
   *   i.e. to define a custom default state of the filter;
   *   when provided for multiple options or not provided at all,
   *   then the default state is empty (null).
   *
   * NOTE: The parent `<clr-datagrid>` component treats the default filter's state as inactive
   * and ignores the selected filter's value in that case. So, if you set a custom default value,
   * you have to provide additional logic for the datagrid's `(clrDgRefresh)` handler to perform proper filtering.
   *
   * @required
   */
  @Input()
  public options: EnumValueFilterOption<E>[] = [];

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
   * Whether to show a label with selected value above the option list.
   * May be useful for a long list of options.
   */
  @Input()
  public showSelectedValue = false;

  /**
   * Optional label to show above the option list
   */
  @Input()
  public title?: string;

  /**
   * A value `E | null` to be set as the actual filter's value on this input change or on `[options]` change.
   *
   * If the provided value is not included in the values within the option list,
   * the filter will be reset to the default state.
   *
   * Providing `null` will clear the current selection, and `undefined` will be ignored.
   * */
  @Input()
  public value?: E | null;

  /**
   * Width in pixels of the filter's container
   * */
  @Input()
  public widthPx: number = ENUM_SINGLE_VALUE_FILTER_DEFAULTS.widthPx;

  /**
   * Emits the filter's state object on every change of the internal filter value.
   * The state object contains the name of a `property` to filter by, defined by the `[propertyKey]` input,
   * and the actual filter `value`.
   *
   * The same object is emitted by the `(clrDgRefresh)` output of the `<clr-datagrid>` parent component
   * for all non-default filter values.
   *
   * `EventEmitter<FilterState<E | null>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<FilterState<E | null>>();

  protected configErrors: string[] = [];
  protected defaultValue: E | null = null;
  protected filterValue: E | null = null;
  protected hasCustomDefaultState = false;

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
  get state(): FilterState<E | null> {
    return {
      property: this.propertyKey,
      value: this.filterValue,
    };
  }

  protected get isStateDefault(): boolean {
    return this.filterValue === this.defaultValue;
  }

  protected get selectedValueLabel(): string {
    if (this.filterValue === null) {
      return 'none';
    }
    const selectedOption = this.options.find(option => option.value === this.filterValue);
    return selectedOption?.label || String(this.filterValue);
  }

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  accepts(item: T): boolean {
    if (this.serverDriven || !item || typeof item !== 'object' || !this.propertyKey) {
      return false;
    }

    if (this.filterValue === null) {
      return true;
    }

    const propertyValue = (item as Record<string | number, unknown>)[this.propertyKey];

    return propertyValue === this.filterValue;
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
    if (this.defaultValue !== null && !this.isValueAllowed(this.defaultValue)) {
      this.defaultValue = null;
    }
    this.setValue(this.defaultValue);
  }

  /**
   * Set the actual filter's value as `E | null.
   *
   * If the provided value is not included in the values within the option list,
   * the filter will be reset to the default state.
   *
   * Providing `null` will clear the current selection, which is equivalent to calling `unselectAll()`.
   * */
  setValue(value: E | null): void {
    if (value !== null && !this.isValueAllowed(value)) {
      this.resetToDefault();
      return;
    }
    this.updateFilterValue(value);
  }

  /**
   * Reset the filter to the empty state
   * */
  unselectAll(): void {
    this.setValue(null);
  }

  protected onInputChange(inputValue: E): void {
    this.setValue(inputValue);
  }

  protected trackByValue(index: number, option: EnumValueFilterOption<E>): E {
    return option.value;
  }

  private isValueAllowed(value: E | null): boolean {
    return this.options.some(option => option.value === value);
  }

  private checkInputsValidity(): string[] {
    if (this.propertyKey) {
      return [];
    }
    return ['[propertyKey] is required'];
  }

  private onOptionsChange(): void {
    const optionsSelectedByDefault = this.options.filter(option => option.selectedByDefault);

    this.defaultValue = optionsSelectedByDefault.length === 1
      ? optionsSelectedByDefault[0].value
      : null;

    this.hasCustomDefaultState = this.defaultValue !== null;

    if (this.value === undefined) {
      this.setValue(this.filterValue ?? this.defaultValue);
      return;
    }

    this.setValue(this.value);
  }

  private updateFilterValue(
    value: E | null,
    params: { emit: boolean } = { emit: true },
  ): void {
    if (value === this.filterValue) {
      return;
    }
    this.filterValue = value;
    if (params.emit) {
      this.filterValueChanged.emit(this.state);
      this.changes.next();
    }
  }
}
