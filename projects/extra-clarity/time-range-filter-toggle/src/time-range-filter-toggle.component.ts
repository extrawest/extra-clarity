import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { angleIcon, calendarIcon, ClarityIcons } from '@cds/core/icon';
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
import { EcTimestampPipe } from '@extrawest/extra-clarity/pipes';
import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
  EcPopoverToggleComponent,
  EcPopoverToggleLabelDirective,
} from '@extrawest/extra-clarity/popover-toggle';
import { Subject, takeUntil } from 'rxjs';

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
    CommonModule,
    ClrIconModule,
    EcPopoverToggleLabelDirective,
    EcPopoverToggleComponent,
    EcTimeRangeFilterComponent,
  ],
  providers: [EcTimestampPipe],
})
export class EcTimeRangeFilterToggleComponent
  implements EcResettableFilter, OnChanges, OnDestroy, OnInit
{
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

  @ViewChild(EcTimeRangeFilterComponent, { static: true })
  protected timeRangeFilter?: EcTimeRangeFilterComponent;

  protected selectedRangeLabel = '';

  private initiallyChecked = false;

  private readonly destroy$ = new Subject<void>();

  get state(): EcTimeRangeFilterToggleState | null {
    if (!this.timeRangeFilter) {
      return null;
    }
    return {
      isActive: this.timeRangeFilter.isActive(),
      state: this.timeRangeFilter.state,
    };
  }

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    private timestampPipe: EcTimestampPipe,
  ) {
    ClarityIcons.addIcons(angleIcon, calendarIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['presets'] || changes['labelLocale']) {
      this.updateSelectedRangeLabel();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
      this.updateSelectedRangeLabel();
    });

    this.updateSelectedRangeLabel(true);
  }

  resetToDefault(): void {
    this.timeRangeFilter?.resetToDefault();
  }

  setValue(value: EcTimeRangeFilterValue): void {
    this.timeRangeFilter?.setValue(value);
  }

  protected onTimeRangeChange(state: EcFilterState<EcTimeRangeFilterValue>): void {
    this.updateSelectedRangeLabel();

    this.valueChanged.emit({
      isActive: !!this.timeRangeFilter?.isActive(),
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

    const timeFrom = this.timestampPipe.transform(start, 'min', this.labelLocale) ?? '';
    const timeTo = this.timestampPipe.transform(end, 'min', this.labelLocale) ?? '';

    if (!start && end) {
      return timeTo
        ? this.commonStrings.parse(commonStrings.timeRangeToggle.beforeDateTime, {
            DATETIME: timeTo,
          })
        : commonStrings.timeRangeFilter.customPeriod;
    }

    if (start && !end) {
      return timeFrom
        ? this.commonStrings.parse(commonStrings.timeRangeToggle.afterDateTime, {
            DATETIME: timeFrom,
          })
        : commonStrings.timeRangeFilter.customPeriod;
    }

    if (timeFrom && timeTo) {
      return `${timeFrom} - ${timeTo}`;
    }

    return commonStrings.timeRangeFilter.customPeriod;
  }

  private updateSelectedRangeLabel(isCalledFromNgOnInit: boolean = false): void {
    this.selectedRangeLabel = this.getTimeRangeLabel(this.timeRangeFilter?.state.value);

    if (!this.initiallyChecked) {
      // TODO: maybe call detectChanges every time when this method is executed?
      this.changeDetectorRef.detectChanges();
    }

    if (isCalledFromNgOnInit) {
      this.initiallyChecked = true;
    }
  }
}
