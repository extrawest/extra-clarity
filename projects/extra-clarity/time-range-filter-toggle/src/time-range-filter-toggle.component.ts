import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { angleIcon, calendarIcon, ClarityIcons } from '@cds/core/icon';
import {
  FilterState,
  ResettableFilter,
  TIMERANGE_FILTER_DEFAULTS,
  TimeRangeFilterComponent,
  TimeRangeFilterValue,
  TimeRangePreset,
} from '@extrawest/extra-clarity/datagrid-filters';
import { TimestampPipe } from '@extrawest/extra-clarity/pipes';
import {
  AnchorToContentAlign,
  ContentPosition,
  EcPopoverToggleLabelDirective,
  PopoverToggleButtonStatus,
  PopoverToggleButtonStyle,
  PopoverToggleComponent,
} from '@extrawest/extra-clarity/popover-toggle';

import { TimeRangeFilterToggleState } from './interfaces';

export const TIMERANGE_FILTER_TOGGLE_DEFAULTS = {
  ...TIMERANGE_FILTER_DEFAULTS,
};

@Component({
  selector: 'ec-time-range-filter-toggle',
  templateUrl: './time-range-filter-toggle.component.html',
  styleUrls: ['./time-range-filter-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
    EcPopoverToggleLabelDirective,
    PopoverToggleComponent,
    TimeRangeFilterComponent,
  ],
  providers: [
    TimestampPipe,
  ],
})
export class TimeRangeFilterToggleComponent implements ResettableFilter {
  // Inputs passed to TimeRangeFilterComponent
  @Input({ required: true })
  public propertyKey!: string;

  @Input()
  public presets: TimeRangePreset[] = [];

  @Input()
  public value?: TimeRangeFilterValue;

  @Input()
  public withCustomRange: boolean = false;

  @Input()
  public closeOnChange: boolean = false;

  @Input()
  public widthPx: number = TIMERANGE_FILTER_TOGGLE_DEFAULTS.widthPx;

  // Inputs passed to PopoverToggleComponent

  @Input()
  public anchorToContentAlign: AnchorToContentAlign = AnchorToContentAlign.StartToStart;

  @Input()
  public contentPosition: ContentPosition = ContentPosition.Bottom;

  @Input()
  public btnDisabled: boolean = false;

  @Input()
  public btnSmall: boolean = true;

  @Input()
  public btnStatus: PopoverToggleButtonStatus = PopoverToggleButtonStatus.Primary;

  @Input()
  public btnStyle: PopoverToggleButtonStyle = PopoverToggleButtonStyle.Outline;

  @Input()
  public closeOnClickOutside: boolean = true;

  @Input()
  public closeOnScroll: boolean = true;

  @Input()
  public open: boolean = false;

  @Output()
  public openChange = new EventEmitter<boolean>();

  @Output()
  public valueChanged = new EventEmitter<TimeRangeFilterToggleState>();

  @ViewChild(TimeRangeFilterComponent, { static: true })
  protected timeRangeFilter?: TimeRangeFilterComponent;

  protected selectedRangeLabel = '';

  private initiallyChecked = false;

  get state(): TimeRangeFilterToggleState | null {
    if (!this.timeRangeFilter) {
      return null;
    }
    return {
      isActive: this.timeRangeFilter.isActive(),
      state: this.timeRangeFilter.state,
    };
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private timestampPipe: TimestampPipe,
  ) {
    ClarityIcons.addIcons(angleIcon, calendarIcon);
  }

  resetToDefault(): void {
    this.timeRangeFilter?.resetToDefault();
  }

  setValue(value: TimeRangeFilterValue): void {
    this.timeRangeFilter?.setValue(value);
  }

  protected onTimeRangeChange(state: FilterState<TimeRangeFilterValue>): void {
    this.updateSelectedRangeLabel();

    this.valueChanged.emit({
      isActive: !!this.timeRangeFilter?.isActive(),
      state,
    });
  }

  private getTimeRangeLabel(filterValue: TimeRangeFilterValue | undefined): string {
    if (!filterValue) {
      return 'Custom Period';
    }
    if (filterValue.preset === '') {
      return 'Unnamed Period';
    }
    if (filterValue.preset !== null) {
      return filterValue.preset;
    }

    const { start, end } = filterValue.custom;

    if (!start && !end) {
      return 'All Time';
    }
    if (!start && end) {
      return 'Before ' + this.timestampPipe.transform(end, 'min');
    }
    if (start && !end) {
      return 'After ' + this.timestampPipe.transform(start, 'min');
    }
    return 'Custom Period';
  }

  private updateSelectedRangeLabel(): void {
    this.selectedRangeLabel = this.getTimeRangeLabel(this.timeRangeFilter?.state.value);

    if (!this.initiallyChecked) {
      this.changeDetectorRef.detectChanges();
      this.initiallyChecked = true;
    }
  }
}
