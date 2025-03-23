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
import {
  ClarityIcons,
  filterIcon,
  filterOffIcon,
  infoStandardIcon,
  warningStandardIcon,
} from '@cds/core/icon';
import {
  ClrCheckboxModule,
  ClrDatagridFilter,
  ClrIconModule,
  ClrPopoverToggleService,
} from '@clr/angular';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { EcMarkMatchedStringPipe } from '@extrawest/extra-clarity/pipes';
import { EcSearchBarComponent } from '@extrawest/extra-clarity/search-bar';
import { areSetsEqual } from '@extrawest/extra-clarity/utils';
import { Subject, takeUntil } from 'rxjs';

import { EcDatagridFilter } from '../common/directives/datagrid-filter.directive';
import { EcShowSelected } from '../common/enums/show-selected.enum';
import {
  EcEnumValueFilterOptionCategory,
  EcEnumValueFilterOptionCategoryConfig,
  EcEnumValueFilterOptionCategoryBorder as OptionCategoryBorder,
} from '../common/interfaces/filter-option-category';
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
    ClrCheckboxModule,
    ClrIconModule,
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
export class EcEnumMultiValueFilterComponent<E, T extends object = object>
  extends EcDatagridFilter<E[], T>
  implements AfterViewInit, OnChanges, OnDestroy, OnInit
{
  /**
   * Optional config for splitting visible options into groups or categories within the filter body.
   * The categories can have a text title and optional bounds as a divider or just a margin.
   */
  @Input() categories?: EcEnumValueFilterOptionCategoryConfig[];

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
   *   when not provided for any option, the default state is an empty array `[]`.
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
   * An array of values `E[]` to be set as the actual filter's state on this input change.
   *
   * If any of the provided values is not included in the values within the option list,
   * the filter will be reset to the default state.
   *
   * Providing an empty array `[]` will clear the current selection, and `undefined` will be ignored.
   * */
  @Input()
  public value?: E[];

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
   * `EventEmitter<EcFilterState<E[]>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<EcFilterState<E[]>>();

  protected configErrors: string[] = [];
  protected hasCustomDefaultState = false;
  protected isStateDefault = true;
  protected selectedValues = new Set<E>();

  protected isInitiated = false;

  protected searchTerm = '';
  protected visibleOptionCategories: EcEnumValueFilterOptionCategory<E>[] = [];

  protected readonly EcShowSelected = EcShowSelected;

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  override readonly changes = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  @ViewChild(EcSearchBarComponent)
  private searchBar?: EcSearchBarComponent;

  constructor(
    protected commonStrings: EcCommonStringsService,
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
  override get state(): EcFilterState<E[]> {
    return {
      property: this.propertyKey,
      value: Array.from(this.selectedValues),
    };
  }

  protected get selectedAmountLabel(): string {
    const selected = this.selectedValues.size;
    if (selected === 0) {
      return this.commonStrings.keys.datagridFilters.selectedNone;
    }
    const total = this.options.length;
    return this.commonStrings.parse(this.commonStrings.keys.datagridFilters.selectedItems, {
      SELECTED: selected.toString(),
      TOTAL: total.toString(),
    });
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

    this.isInitiated = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isValueChanged = !!changes['value'];

    if (changes['options']) {
      this.onOptionsChange(isValueChanged ? this.value : undefined);
      return;
    }

    if (isValueChanged && this.value !== undefined) {
      this.setValue(this.value);
    }

    if (changes['categories']) {
      this.updateVisibleOptions();
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
      return selectedValues.every((selectedValue) => propertyValue.includes(selectedValue));
    }
    return selectedValues.some((selectedValue) => propertyValue.includes(selectedValue));
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
    this.updateSelectedValues(
      new Set(
        this.options.filter((option) => option.selectedByDefault).map((option) => option.value),
      ),
    );
  }

  /**
   * Set the actual filter's value as `E[]`.
   *
   * If any of the provided values is not included in the values within the option list,
   *   the filter will be reset to the default state.
   *
   * Providing an empty array `[]` will clear the current selection, which is equivalent to calling `clearSelection()`.
   * */
  override setValue(values: E[]): void {
    if (Array.isArray(values) && this.areAllValuesAllowed(values)) {
      this.updateSelectedValues(new Set(values));
      return;
    }
    this.resetToDefault();
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

  private areAllValuesAllowed(values: E[]): boolean {
    if (values.length === 0) {
      return true;
    }
    return values.every((value) => {
      return this.options.some((option) => option.value === value);
    });
  }

  private checkIfStateIsDefault(): boolean {
    return this.options.every((option) => {
      return !!option.selectedByDefault === this.selectedValues.has(option.value);
    });
  }

  private checkInputsValidity(): string[] {
    if (this.propertyKey) {
      return [];
    }
    return [this.commonStrings.keys.datagridFilters.propertyKeyRequired];
  }

  private isOptionBeingSearched(option: EcEnumValueFilterOption<E>, searchTerm: string): boolean {
    return (
      option.searchableValue?.toLowerCase().includes(searchTerm) ||
      option.label.toLowerCase().includes(searchTerm)
    );
  }

  private onOptionsChange(newFilterValue: E[] | undefined): void {
    this.updateVisibleOptions();

    this.isStateDefault = this.checkIfStateIsDefault();
    this.hasCustomDefaultState = this.options.some((option) => option.selectedByDefault);

    if (newFilterValue !== undefined) {
      this.setValue(newFilterValue);
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

    if (params.emit && this.isInitiated) {
      this.filterValueChanged.emit(this.state);
      this.changes.next();
    }

    this.changeDetectorRef.markForCheck();
  }

  private updateVisibleOptions(): void {
    const visibleOptions = this.searchTerm
      ? this.options.filter((option) => this.isOptionBeingSearched(option, this.searchTerm))
      : [...this.options];

    if (!visibleOptions.length) {
      this.visibleOptionCategories = [];
      return;
    }

    if (!this.categories?.length) {
      this.visibleOptionCategories = [{ options: visibleOptions }];
      return;
    }

    const visibleOptionCategories: EcEnumValueFilterOptionCategory<E>[] = [];

    this.categories.forEach(({ id, label, top, bottom }) => {
      const thisCategoryOptions = visibleOptions.filter((option) => id && option.categoryId === id);

      if (thisCategoryOptions.length) {
        visibleOptionCategories.push({
          options: thisCategoryOptions,
          label,
          withDividerTop: top === OptionCategoryBorder.Divider,
          withDividerBottom: bottom === OptionCategoryBorder.Divider,
          withMarginTop: top === OptionCategoryBorder.Margin,
          withMarginBottom: bottom === OptionCategoryBorder.Margin,
        });
      }
    });

    if (visibleOptionCategories.length == 0) {
      this.visibleOptionCategories = [{ options: visibleOptions }];
      return;
    }

    const categoryIds = new Set(this.categories.map((category) => category.id));

    const optionsWithoutCategory = visibleOptions.filter(
      (option) => !option.categoryId || !categoryIds.has(option.categoryId),
    );

    if (optionsWithoutCategory.length) {
      visibleOptionCategories.push({
        options: optionsWithoutCategory,
        withDividerTop: true,
      });
    }

    this.visibleOptionCategories = visibleOptionCategories;
  }
}
