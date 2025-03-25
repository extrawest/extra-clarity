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
  ClrDatagridFilter,
  ClrIconModule,
  ClrPopoverToggleService,
  ClrRadioModule,
} from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { EcMarkMatchedStringPipe } from '@extrawest/extra-clarity/pipes';
import { EcSearchBarComponent } from '@extrawest/extra-clarity/search-bar';

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

export const ENUM_SINGLE_VALUE_FILTER_DEFAULTS = {
  maxHeightPx: 300,
  widthPx: 200,
  searchBarForAmount: 10,
} as const;

@Component({
  selector: 'ec-enum-single-value-filter',
  templateUrl: './enum-single-value-filter.component.html',
  styleUrls: ['./enum-single-value-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ClrIconModule,
    ClrRadioModule,
    EcMarkMatchedStringPipe,
    EcSearchBarComponent,
  ],
  providers: [
    // make EcEnumSingleValueFilterComponent queryable via @ViewChild(EcDatagridFilter)
    {
      provide: EcDatagridFilter,
      useExisting: EcEnumSingleValueFilterComponent,
    },
  ],
})
export class EcEnumSingleValueFilterComponent<E, T extends object = object>
  extends EcDatagridFilter<E | null, T>
  implements AfterViewInit, OnChanges, OnDestroy, OnInit
{
  /**
   * Optional config for splitting visible options into groups or categories within the filter body.
   * The categories can have a text title and optional bounds as a divider or just a margin.
   */
  @Input() categories?: EcEnumValueFilterOptionCategoryConfig[];

  /**
   * When `true`, the filter will be closed on selecting any new value or on resetting/clearing
   * */
  @Input()
  public closeOnChange = false;

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
   * Max height in pixels of the option list container.
   * If the container's content exceeds the limit, a vertical scrollbar is shown.
   * */
  @Input()
  public maxHeightPx: number = ENUM_SINGLE_VALUE_FILTER_DEFAULTS.maxHeightPx;

  /**
   * List of options to select from. Each option contains:
   * * `value`: a value of any type `<E>` to be used as a new filter value on selecting this option;
   *   values must be unique among all options
   * * `label`: a required string label to be shown in the filter's body next to the radio button for this option;
   *   this value is also used for internal filtering via the search bar (activated by the `[withSearchBar]` input),
   *   even when a custom label template is provided by the `[customLabelTpl]` input.
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
  public searchBarForAmount: number = ENUM_SINGLE_VALUE_FILTER_DEFAULTS.searchBarForAmount;

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
   *
   * * `EcShowSelected.WithSearchbar` = show only when the searchbar is visible (default)
   * * `EcShowSelected.Always` = show always
   * * `EcShowSelected.Never` = don't show (default)
   */
  @Input()
  public showSelectedValue: EcShowSelected = EcShowSelected.WithSearchbar;

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
   * A value `E | null` to be set as the actual filter's value on this input change.
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
   * `EventEmitter<EcFilterState<E | null>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<EcFilterState<E | null>>();

  protected configErrors: string[] = [];
  protected defaultValue: E | null = null;
  protected filterValue: E | null = null;
  protected hasCustomDefaultState = false;

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
  override get state(): EcFilterState<E | null> {
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
      return this.commonStrings.keys.datagridFilters.selectedNone;
    }
    const selectedOption = this.options.find((option) => option.value === this.filterValue);
    return this.commonStrings.parse(this.commonStrings.keys.datagridFilters.selected, {
      VALUE: selectedOption?.label || String(this.filterValue),
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

    if (this.filterValue === null) {
      return true;
    }

    const propertyValue = (item as Record<string | number, unknown>)[this.propertyKey];

    return propertyValue === this.filterValue;
  }

  /**
   * Reset the filter to the empty state
   * */
  override clearSelection(): void {
    this.setValue(null);

    if (this.closeOnChange) {
      this.hideFilter();
    }
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
    if (this.defaultValue !== null && !this.isValueAllowed(this.defaultValue)) {
      this.defaultValue = null;
    }
    this.setValue(this.defaultValue);

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  /**
   * Set the actual filter's value as `E | null`.
   *
   * If the provided value is not included in the values within the option list,
   * the filter will be reset to the default state.
   *
   * Providing `null` will clear the current selection, which is equivalent to calling `clearSelection()`.
   * */
  override setValue(value: E | null): void {
    if (value !== null && !this.isValueAllowed(value)) {
      this.resetToDefault();
      return;
    }
    this.updateFilterValue(value);
  }

  protected onInputChange(inputValue: E): void {
    this.setValue(inputValue);

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  protected onSearchTermChange(value: string): void {
    this.searchTerm = value.toLowerCase();
    this.updateVisibleOptions();
  }

  private checkInputsValidity(): string[] {
    if (this.propertyKey) {
      return [];
    }
    return [this.commonStrings.keys.datagridFilters.propertyKeyRequired];
  }

  private hideFilter(): void {
    if (this.clrPopoverToggleService?.open) {
      this.clrPopoverToggleService.open = false;
    }
  }

  private isOptionBeingSearched(option: EcEnumValueFilterOption<E>, searchTerm: string): boolean {
    return (
      option.searchableValue?.toLowerCase().includes(searchTerm) ||
      option.label.toLowerCase().includes(searchTerm)
    );
  }

  private isValueAllowed(value: E | null): boolean {
    return this.options.some((option) => option.value === value);
  }

  private onOptionsChange(newFilterValue: E | null | undefined): void {
    this.updateVisibleOptions();

    const optionsSelectedByDefault = this.options.filter((option) => option.selectedByDefault);

    this.defaultValue =
      optionsSelectedByDefault.length === 1 ? optionsSelectedByDefault[0].value : null;

    this.hasCustomDefaultState = this.defaultValue !== null;

    if (newFilterValue === undefined) {
      this.setValue(this.filterValue ?? this.defaultValue);
      return;
    }

    this.setValue(newFilterValue);
  }

  private updateFilterValue(value: E | null, params: { emit: boolean } = { emit: true }): void {
    if (value === this.filterValue) {
      return;
    }

    this.filterValue = value;

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
