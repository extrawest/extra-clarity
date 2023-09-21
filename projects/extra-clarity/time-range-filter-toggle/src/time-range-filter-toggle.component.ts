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
  EcFilterState,
  EcResettableFilter,
  EcTimeRangeFilterComponent,
  EcTimeRangeFilterValue,
  EcTimeRangePreset,
  TIMERANGE_FILTER_DEFAULTS,
} from '@extrawest/extra-clarity/datagrid-filters';
import { EcTimestampPipe } from '@extrawest/extra-clarity/pipes';
import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
  EcPopoverToggleComponent,
  EcPopoverToggleLabelDirective,
} from '@extrawest/extra-clarity/popover-toggle';

import { EcTimeRangeFilterToggleState } from './interfaces';

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
    EcPopoverToggleComponent,
    EcTimeRangeFilterComponent,
  ],
  providers: [
    EcTimestampPipe,
  ],
})
export class EcTimeRangeFilterToggleComponent implements EcResettableFilter {
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

  @Output()
  public openChange = new EventEmitter<boolean>();

  @Output()
  public valueChanged = new EventEmitter<EcTimeRangeFilterToggleState>();

  @ViewChild(EcTimeRangeFilterComponent, { static: true })
  protected timeRangeFilter?: EcTimeRangeFilterComponent;

  protected selectedRangeLabel = '';

  private initiallyChecked = false;

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
    private changeDetectorRef: ChangeDetectorRef,
    private timestampPipe: EcTimestampPipe,
  ) {
    ClarityIcons.addIcons(angleIcon, calendarIcon);
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
