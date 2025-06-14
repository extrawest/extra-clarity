import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClarityIcons, angleIcon, calendarIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

import {
  EcFilterState,
  EcResettableFilter,
  EcTimeRangeFilterComponent,
  EcTimeRangeFilterValue,
  EcTimeRangePreset,
  TIMERANGE_FILTER_DEFAULTS,
} from '@extrawest/extra-clarity/datagrid-filters';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
  EcPopoverToggleComponent,
  EcPopoverToggleLabelDirective,
} from '@extrawest/extra-clarity/popover-toggle';
import { formatLocalDateTime, formatLocalTime } from '@extrawest/extra-clarity/utils';

import { EcTimeRangeFilterToggleState } from './interfaces';

export const TIMERANGE_FILTER_TOGGLE_DEFAULTS = {
  ...TIMERANGE_FILTER_DEFAULTS,
};

@Component({
  selector: 'ec-time-range-filter-toggle',
  templateUrl: './time-range-filter-toggle.component.html',
  styleUrls: ['./time-range-filter-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ClrIconModule,
    EcPopoverToggleLabelDirective,
    EcPopoverToggleComponent,
    EcTimeRangeFilterComponent,
  ],
})
export class EcTimeRangeFilterToggleComponent implements EcResettableFilter, OnChanges, OnInit {
  @Input()
  public labelLocale?: string;

  // Inputs passed to EcTimeRangeFilterComponent
  @Input({ required: true })
  public propertyKey!: string;

  @Input()
  public presets: EcTimeRangePreset[] = [];

  @Input()
  public value?: EcTimeRangeFilterValue;

  @Input()
  public withCustomRange: boolean = false;

  @Input()
  public withTime: boolean = true;

  @Input()
  public timeZone?: string;

  @Input()
  public closeOnChange: boolean = false;

  @Input()
  public widthPx: number = TIMERANGE_FILTER_TOGGLE_DEFAULTS.widthPx;

  // Inputs passed to EcPopoverToggleComponent

  @Input()
  public anchorToContentAlign: EcAnchorToContentAlign = EcAnchorToContentAlign.StartToStart;

  @Input()
  public contentPosition: EcContentPosition = EcContentPosition.Bottom;

  @Input()
  public btnDisabled: boolean = false;

  @Input()
  public btnSmall: boolean = true;

  @Input()
  public btnStatus: EcPopoverToggleButtonStatus = EcPopoverToggleButtonStatus.Primary;

  @Input()
  public btnStyle: EcPopoverToggleButtonStyle = EcPopoverToggleButtonStyle.Outline;

  @Input()
  public closeOnClickOutside: boolean = true;

  @Input()
  public closeOnScroll: boolean = true;

  @Input()
  public open: boolean = false;

  /** `EventEmitter<boolean>` */
  @Output()
  public openChange = new EventEmitter<boolean>();

  /** `EventEmitter<EcTimeRangeFilterToggleState>` */
  @Output()
  public valueChanged = new EventEmitter<EcTimeRangeFilterToggleState>();

  protected readonly timeRangeFilter = viewChild.required(EcTimeRangeFilterComponent);

  protected selectedRangeLabel = '';

  private initiallyChecked = false;

  get state(): EcTimeRangeFilterToggleState {
    const timeRangeFilter = this.timeRangeFilter();
    return {
      isActive: timeRangeFilter.isActive(),
      state: timeRangeFilter.state,
    };
  }

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {
    ClarityIcons.addIcons(angleIcon, calendarIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['presets'] || changes['labelLocale']) {
      this.updateSelectedRangeLabel();
    }
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
      this.updateSelectedRangeLabel();
    });

    this.updateSelectedRangeLabel(true);
  }

  resetToDefault(): void {
    this.timeRangeFilter().resetToDefault();
  }

  setValue(value: EcTimeRangeFilterValue): void {
    this.timeRangeFilter().setValue(value);
  }

  protected onTimeRangeChange(state: EcFilterState<EcTimeRangeFilterValue>): void {
    this.updateSelectedRangeLabel();

    this.valueChanged.emit({
      isActive: this.timeRangeFilter().isActive(),
      state,
    });
  }

  private getTimeRangeLabel(filterValue: EcTimeRangeFilterValue | undefined): string {
    const commonStrings = this.commonStrings.keys;

    if (!filterValue) {
      return commonStrings.timeRangeFilter.customPeriod;
    }

    const selectedPreset = this.presets.find((preset) => preset.id === filterValue.presetId);
    if (selectedPreset) {
      return selectedPreset.label || commonStrings.timeRangeToggle.unnamedPeriod;
    }

    const { start, end } = filterValue.custom;

    if (!start && !end) {
      return commonStrings.timeRangeToggle.allTime;
    }

    const dateTimeFrom = formatLocalDateTime(start, this.withTime, this.labelLocale);
    const dateTimeTo = formatLocalDateTime(end, this.withTime, this.labelLocale);

    if (!start && end) {
      return dateTimeTo
        ? this.commonStrings.parse(commonStrings.timeRangeToggle.beforeDateTime, {
            DATETIME: dateTimeTo,
          })
        : commonStrings.timeRangeFilter.customPeriod;
    }

    if (start && !end) {
      return dateTimeFrom
        ? this.commonStrings.parse(commonStrings.timeRangeToggle.afterDateTime, {
            DATETIME: dateTimeFrom,
          })
        : commonStrings.timeRangeFilter.customPeriod;
    }

    if (!dateTimeFrom || !dateTimeTo) {
      return commonStrings.timeRangeFilter.customPeriod;
    }

    const startDate = start?.slice(0, 10);
    const endDate = end?.slice(0, 10);

    if (startDate !== endDate) {
      return `${dateTimeFrom} - ${dateTimeTo}`;
    }

    if (!this.withTime) {
      return dateTimeFrom;
    }

    const dateFrom = formatLocalDateTime(start, false, this.labelLocale);
    const timeFrom = formatLocalTime(start, this.labelLocale);
    const timeTo = formatLocalTime(end, this.labelLocale);

    return `${dateFrom}, ${timeFrom} - ${timeTo}`;
  }

  private updateSelectedRangeLabel(isCalledFromNgOnInit: boolean = false): void {
    this.selectedRangeLabel = this.getTimeRangeLabel(this.timeRangeFilter()?.state.value);

    if (!this.initiallyChecked) {
      // TODO: maybe call detectChanges every time when this method is executed?
      this.changeDetectorRef.detectChanges();
    }

    if (isCalledFromNgOnInit) {
      this.initiallyChecked = true;
    }
  }
}
