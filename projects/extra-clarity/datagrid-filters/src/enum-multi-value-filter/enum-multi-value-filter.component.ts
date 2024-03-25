import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import {
  ClarityIcons,
  filterIcon,
  filterOffIcon,
  infoStandardIcon,
  warningStandardIcon,
} from '@cds/core/icon';
import { ClrCheckboxModule, ClrDatagridFilter, ClrPopoverToggleService } from '@clr/angular';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { EcMarkMatchedStringPipe } from '@extrawest/extra-clarity/pipes';
import { EcSearchBarComponent } from '@extrawest/extra-clarity/search-bar';
import { areSetsEqual } from '@extrawest/extra-clarity/utils';
import { Subject, takeUntil } from 'rxjs';

import { EcDatagridFilter } from '../common/directives/datagrid-filter.directive';
import { EcShowSelected } from '../common/enums/show-selected.enum';
import {
  EcEnumValueFilterOption,
  EcFilterState,
} from '../common/interfaces/filter-state.interface';

export const ENUM_MULTI_VALUE_FILTER_DEFAULTS = {
  maxHeightPx: 300,
  widthPx: 200,
  searchBarForAmount: 10,
} as const;

@Component({
  selector: 'ec-enum-multi-value-filter',
  templateUrl: './enum-multi-value-filter.component.html',
  styleUrls: ['./enum-multi-value-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
    ClrCheckboxModule,
    EcMarkMatchedStringPipe,
    EcSearchBarComponent,
  ],
  providers: [
    // make EcEnumMultiValueFilterComponent queryable via @ViewChild(EcDatagridFilter)
    {
      provide: EcDatagridFilter,
      useExisting: EcEnumMultiValueFilterComponent,
    },
  ],
})
export class EcEnumMultiValueFilterComponent<E, T extends object = {}>
  extends EcDatagridFilter<E[] | null, T>
  implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  /**
   * Optional `TemplateRef` for a template to use as a custom option label.
   * May be useful to show icons within an option label or to apply a custom format to it.
   *
   * The entire `option: EcEnumValueFilterOption<E>` object is passed to this template
   * as the `$implicit` context parameter.
   *
   * Also the substring entered into the internal search bar is passed to the context as `marked`.
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
   * * `label`: a required string label to be shown in the filter's body next to the checkbox for this option;
   *   this value is also used for internal filtering via the search bar (activated by the `[withSearchBar]` input),
   *   even when a custom label template is provided by the `[customLabelTpl]` input.
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
  public options: EcEnumValueFilterOption<E>[] = [];

  /**
   * When `[serverDriven]="true"`, it's a free-form identifier defined by a developer, that will be shown as `property`
   * in the output state to help identify the filter's state amidst another filters;
   *
   * When `[serverDriven]="false"`, it must be equal to the name of a field in the object passed to the `*clrDgItems`
   * directive on `<clr-dg-row>` to filter by, i.e. to decide whether a row should be shown or not.
   *
   * @required
   */
  @Input({ required: true })
  public propertyKey = '';

  /**
   * Minimal amount of options to show a search bar above the option list to filter the list
   * */
  @Input()
  public searchBarForAmount: number = ENUM_MULTI_VALUE_FILTER_DEFAULTS.searchBarForAmount;

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
   *
   * * `EcShowSelected.WithSearchbar` = show only when the searchbar is visible (default)
   * * `EcShowSelected.Always` = show always
   * * `EcShowSelected.Never` = don't show
   */
  @Input()
  public showSelectedAmount: EcShowSelected = EcShowSelected.WithSearchbar;

  /**
   * Whether to stretch all label containers to the full width of the filter container
   */
  @Input()
  public stretchLabels = false;

  /**
   * Optional label to show above the option list
   */
  @Input()
  public title?: string;

  /**
   * A value `E[] | null` to be set as the actual filter's value on this input change or on `[options]` change.
   *
   * If any of the provided values is not included in the values within the option list,
   * the filter will be reset to the default state.
   *
   * Providing `null` will clear the current selection, and `undefined` will be ignored.
   * */
  @Input()
  public value: E[] | null;

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
   * `EventEmitter<EcFilterState<E[] | null>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<EcFilterState<E[] | null>>();

  protected configErrors: string[] = [];
  protected hasCustomDefaultState = false;
  protected isStateDefault = true;
  protected selectedValues = new Set<E>();

  protected searchTerm = '';
  protected visibleOptions: EcEnumValueFilterOption<E>[] = [];

  protected readonly EcShowSelected = EcShowSelected;

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  override readonly changes = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  @ViewChild(EcSearchBarComponent)
  private searchBar?: EcSearchBarComponent;

  constructor(
    public commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() private clrDatagridFilterContainer?: ClrDatagridFilter,
    @Optional() private clrPopoverToggleService?: ClrPopoverToggleService,
  ) {
    super();
    this.clrDatagridFilterContainer?.setFilter(this);

    ClarityIcons.addIcons(filterIcon, filterOffIcon, infoStandardIcon, warningStandardIcon);
  }

  /**
   * Get the actual filter state in the same shape as it's emitted to the parent datagrid.
   *
   * @see {@link filterValueChanged} for more details
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  override get state(): EcFilterState<E[] | null> {
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
      return this.commonStrings.keys.datagridFilters.selectedNone;
    }
    const total = this.options.length;
    return this.commonStrings.parse(this.commonStrings.keys.datagridFilters.selectedItems, {
      SELECTED: selected,
      TOTAL: total,
    })
  }

  protected get showSearchBar(): boolean {
    return this.options.length >= this.searchBarForAmount;
  }

  ngAfterViewInit(): void {
    this.clrPopoverToggleService?.openChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen: boolean) => {
        if (isOpen) {
          setTimeout(() => this.searchBar?.focusSearchBar());
        }
      });
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

    this.commonStrings.stringsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  override accepts(item: T): boolean {
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

    if (!isArray) {
      return this.selectedValues.has(propertyValue as E);
    }

    if (this.matchSelected === 'exact') {
      return areSetsEqual(new Set(propertyValue), this.selectedValues, { ignoreOrder: true });
    }

    const selectedValues = Array.from(this.selectedValues);

    if (this.matchSelected === 'all') {
      return selectedValues.every(selectedValue => propertyValue.includes(selectedValue));
    }
    return selectedValues.some(selectedValue => propertyValue.includes(selectedValue));
  }

  /**
   * Reset the filter to the empty state
   * */
  override clearSelection(): void {
    this.updateSelectedValues(new Set());
  }

  /**
   * Indicate whether the filter is active, i.e. has a non-default value selected.
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   * */
  override isActive(): boolean {
    return !!this.propertyKey && !this.isStateDefault;
  }

  /**
   * Reset the filter to the default state
   * */
  override resetToDefault(): void {
    this.updateSelectedValues(new Set(
      this.options
        .filter(option => option.selectedByDefault)
        .map(option => option.value),
    ));
  }

  /**
   * Set the actual filter's value as `E[] | null`.
   *
   * If any of the provided values is not included in the values within the option list,
   *   the filter will be reset to the default state.
   *
   * Providing `null` will clear the current selection, which is equivalent to calling `clearSelection()`.
   * */
  override setValue(values: E[] | null): void {
    if (!values || !this.areAllValuesAllowed(values)) {
      this.resetToDefault();
      return;
    }
    this.updateSelectedValues(new Set(values));
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

  protected onSearchTermChange(value: string): void {
    this.searchTerm = value.toLowerCase();
    this.updateVisibleOptions();
  }

  protected trackByValue(index: number, option: EcEnumValueFilterOption<E>): E {
    return option.value;
  }

  private areAllValuesAllowed(filterValues: E[]): boolean {
    if (filterValues.length === 0) {
      return true;
    }
    return filterValues.every(value => {
      return this.options.some(option => option.value === value);
    });
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
    return [this.commonStrings.keys.datagridFilters.propertyKeyRequired];
  }

  private onOptionsChange(): void {
    this.updateVisibleOptions();

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
    this.changeDetectorRef.markForCheck();
  }

  private updateVisibleOptions(): void {
    if (!this.searchTerm) {
      this.visibleOptions = [...this.options];
    }

    // TODO: re-think how to filter options with a custom label template
    this.visibleOptions = this.options.filter(option => {
      return option.label.toLowerCase().includes(this.searchTerm);
    });
  }
}
