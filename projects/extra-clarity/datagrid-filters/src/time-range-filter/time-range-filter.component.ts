import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClrDatagridFilter, ClrPopoverToggleService, ClrRadioModule } from '@clr/angular';
import { Subject } from 'rxjs';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import {
  convertToLocalDateTime,
  isBefore,
  isSame,
  isSameOrAfter,
} from '@extrawest/extra-clarity/utils';

import { EcDatagridFilter } from '../common/directives/datagrid-filter.directive';
import { EcFilterState } from '../common/interfaces/filter-state.interface';

import { EcDateTimeGroupComponent } from './components/date-time-group';
import { ALL_TIME } from './constants';
import {
  EcCustomTimeRange,
  EcTimeRangePreset,
  EcTimeRangeFilterValue as FilterValue,
} from './interfaces';
import { containsAllTimePreset, getDefaultPreset, getFilterRangeValues } from './utils';

export const TIMERANGE_FILTER_DEFAULTS = {
  widthPx: 225,
};

/*
 * TODO: possible adjustments in future versions:
 * - skip setting a value via 'setValue' or 'value' if it's not valid
 * - add ability to configure any custom range as the default filter value (not only ALL_TIME)
 * - add seconds as optional (configurable) precision of the date-time inputs
 * - add configurable switch between the 'date only' and 'date-time' modes
 * - ignore duplicated or empty (no-label) presets before applying them to the filter
 * - on preset-list update - keep the filter value if it is allowed in the updated list as well (when this.defaultPreset !== null)
 * - maybe highlight not 'non-empty' inputs but 'modified' (i.e. different from applied values)
 */

@Component({
  selector: 'ec-time-range-filter',
  templateUrl: './time-range-filter.component.html',
  styleUrls: ['./time-range-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ClrRadioModule, EcDateTimeGroupComponent],
  providers: [
    {
      provide: EcDatagridFilter,
      useExisting: EcTimeRangeFilterComponent,
    },
  ],
})
export class EcTimeRangeFilterComponent<T extends object = object>
  extends EcDatagridFilter<FilterValue, T>
  implements AfterViewInit, OnChanges, OnInit
{
  /**
   * When `true`, the filter will be closed via ClrPopoverToggleService
   * on selecting any new value or on resetting/clearing.
   *
   * To work as described, the filter component should be placed inside of a parent component that
   * provides ClrPopoverToggleService, i.e. in a datagrid column or a <ec-popover-toggle> component.
   */
  @Input()
  public closeOnChange: boolean = false;

  /**
   * List of time-range presets to select from. Each option contains:
   * * `id`: a required non-empty string; must be unique within the filter to identify the preset among others;
   * * `label`: a required non-empty string to be shown in the filter's body next to the radio button
   *   for this option;
   * * `timeRangeFn`: a required function which must return a time range object containing the local
   *   date (YYYY-MM-DD) or date-time (YYYY-MM-DDTHH:mm) strings for `start` and `end` of the period
   *   specified by the preset; this function can be also re-used outside of the component to get
   *   the actual `start` and `end` values for a selected preset;
   * * `default`: an optional boolean to mark the preset selected by default,
   *   i.e. to define a custom default state of the filter;
   *   when provided for multiple options or not provided at all, then the default state is 'custom range'.
   *
   * NOTE: The parent `<clr-datagrid>` component treats the default filter's state as inactive
   * and ignores the selected filter's value in that case. So, if you set a custom default value,
   * you have to provide additional logic for the datagrid's `(clrDgRefresh)` handler to perform proper filtering.
   */
  @Input()
  public presets: EcTimeRangePreset[] = [];

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
  public propertyKey!: string;

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
   * A value to be set as the actual filter's value on this input change or on `[presets]` change.
   * `undefined` will be ignored.
   */
  @Input()
  public value?: FilterValue;

  /** Width in pixels of the filter's container */
  @Input()
  public widthPx: number = TIMERANGE_FILTER_DEFAULTS.widthPx;

  /** Whether to show input controls for picking a custom date-time range */
  @Input()
  public withCustomRange: boolean = false;

  /**
   * Whether the input fields of the custom range section should allow setting time along to date.
   *
   * It also defines the output format of the 'start' and 'end' strings: date-only or date-time.
   * */
  @Input()
  public withTime: boolean = true;

  /**
   * Custom timezone to be used within presets, e.g. for getting local date-times of today,
   * yesterday, etc. As well as for a client-driven filtering to be able to compare numeric
   * UNIX-timestamps and string local dates.
   *
   * If not set, the client-side (browser's) timezone will be used instead.
   */
  @Input()
  public timeZone?: string;

  /**
   * Emits the filter's state object on every change of the internal filter value.
   * The state object contains the name of a `property` to filter by, defined by the `[propertyKey]` input,
   * and the actual filter `value`.
   *
   * The same object is emitted by the `(clrDgRefresh)` output of the `<clr-datagrid>` parent component
   * for all non-default filter values.
   *
   * `EventEmitter<EcFilterState<EcTimeRangeFilterValue>>`
   */
  @Output()
  public filterValueChanged = new EventEmitter<EcFilterState<FilterValue>>();

  protected readonly radioControl = new FormControl<string | null>(null);

  protected configErrors: string[] = [];

  protected defaultPresetId: FilterValue['presetId'] = null;
  protected filterValue: FilterValue = {
    presetId: null,
    custom: ALL_TIME,
  };
  protected visualCustomRange: EcCustomTimeRange = ALL_TIME;
  protected hasAllTimePreset = false;

  protected isInitiated = false;

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  override readonly changes = new Subject<void>();

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    @Optional() private clrDatagridFilterContainer?: ClrDatagridFilter,
    @Optional() private clrPopoverToggleService?: ClrPopoverToggleService,
  ) {
    super();
    this.clrDatagridFilterContainer?.setFilter(this);
  }

  /**
   * Get the actual filter state in the same shape as it's emitted to the parent datagrid.
   *
   * @see {@link filterValueChanged} for more details
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   */
  override get state(): EcFilterState<FilterValue> {
    return {
      property: this.propertyKey,
      value: this.filterValue,
    };
  }

  ngAfterViewInit(): void {
    this.isInitiated = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['presets']) {
      this.onPresetsChange();
      return;
    }

    if (changes['value'] && this.value) {
      this.setValue(this.value);
    }
  }

  ngOnInit(): void {
    this.configErrors = this.checkInputsValidity();

    // Mark as initially touched to prevent a NG0100 error for 'ng-untouched' property
    // when [closeOnChange]="true" and the formControl's value changed for the fist time
    this.radioControl.markAsTouched();

    this.radioControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onPresetSelected(value));

    this.clrPopoverToggleService?.openChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((open) => {
        if (open) {
          this.updateVisualCustomRange();
          return;
        }
        if (this.radioControl.value === null) {
          this.onCustomRangeDiscard();
        }
      });

    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  /** @ignore  Implements the `ClrDatagridFilterInterface` interface */
  override accepts(item: T): boolean {
    if (this.serverDriven || !item || typeof item !== 'object' || !this.propertyKey) {
      return false;
    }

    const { start, end } = getFilterRangeValues(
      this.filterValue,
      this.presets,
      this.withTime,
      this.timeZone,
    );

    if (!start && !end) {
      return true;
    }

    // It's assumed that the filtered item contains a timestamp as a number of ms since 1970.01.01
    // or as a standard JS Date string to be passed to the Date() constructor

    const valueInItem = (item as Record<string | number, unknown>)[this.propertyKey];

    if (!valueInItem || typeof valueInItem !== 'string' || typeof valueInItem !== 'number') {
      return false;
    }

    const localDateTime = convertToLocalDateTime(valueInItem, this.withTime, this.timeZone);
    if (!localDateTime) {
      return false;
    }

    return (
      (!start || isSameOrAfter(localDateTime, start)) &&
      (!end || isBefore(localDateTime, end) || (!this.withTime && isSame(localDateTime, end)))
    );
  }

  /** Reset the filter to the default state */
  override clearSelection(): void {
    // TODO: select 'ALL_TIME' from presets if it is present there,
    // or select an empty custom range if the filter uses the custom range selector,
    // or ...
    this.resetToDefault();
  }

  /**
   * Indicate whether the filter is active, i.e. has a non-default value selected.
   *
   * Implements the `ClrDatagridFilterInterface` interface.
   */
  override isActive(): boolean {
    return (
      this.filterValue.presetId !== this.defaultPresetId ||
      (this.filterValue.presetId === null &&
        (!!this.filterValue.custom.start || !!this.filterValue.custom.end))
    );
  }

  /** Reset the filter to the default state */
  override resetToDefault(): void {
    if (this.defaultPresetId !== null) {
      this.onPresetSelected(this.defaultPresetId);
      return;
    }

    this.setValue({
      presetId: null,
      custom: ALL_TIME,
    });

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  /**
   * Set the actual filter's value as a `EcTimeRangeFilterValue` object.
   */
  override setValue(value: FilterValue): void {
    this.updateFilterValue(value);
    this.updateVisualCustomRange();

    if (this.radioControl.value !== this.filterValue.presetId) {
      this.radioControl.setValue(this.filterValue.presetId, { emitEvent: false });
    }
  }

  protected onCustomRangeApply(range: EcCustomTimeRange): void {
    this.setValue({
      presetId: null,
      custom: range,
    });

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  protected onCustomRangeDiscard(): void {
    this.updateVisualCustomRange();

    if (this.filterValue.presetId !== null) {
      this.radioControl.setValue(this.filterValue.presetId);
    }

    if (this.closeOnChange) {
      this.hideFilter();
    }
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

  private isFilterValueEqual(valueA: FilterValue, valueB: FilterValue): boolean {
    return (
      valueA.presetId === valueB.presetId &&
      valueA.custom.start === valueB.custom.start &&
      valueA.custom.end === valueB.custom.end
    );
  }

  private onPresetsChange(): void {
    this.defaultPresetId = getDefaultPreset(this.presets)?.id ?? null;
    this.hasAllTimePreset = containsAllTimePreset(this.presets);

    if (this.value) {
      this.setValue(this.value);
      return;
    }

    if (this.defaultPresetId !== null) {
      this.resetToDefault();
      return;
    }

    if (this.filterValue.presetId === null) {
      return;
    }

    if (this.presets.some((preset) => preset.id === this.filterValue.presetId)) {
      this.onPresetSelected(this.filterValue.presetId);
      return;
    }

    this.resetToDefault();
  }

  private onPresetSelected(presetId: string | null): void {
    if (presetId === null) {
      return;
    }

    this.setValue({ presetId, custom: ALL_TIME });

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  private updateFilterValue(newValue: FilterValue): void {
    if (this.isFilterValueEqual(newValue, this.filterValue)) {
      return;
    }

    this.filterValue = newValue;

    if (this.isInitiated) {
      this.filterValueChanged.emit(this.state);
      this.changes.next();
    }

    this.changeDetectorRef.markForCheck();
  }

  private updateVisualCustomRange(): void {
    this.visualCustomRange = getFilterRangeValues(
      this.filterValue,
      this.presets,
      this.withTime,
      this.timeZone,
    );

    this.changeDetectorRef.markForCheck();
  }
}
