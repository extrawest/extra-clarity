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
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClrDatagridFilter, ClrPopoverToggleService, ClrRadioModule } from '@clr/angular';
import { isEqual } from 'lodash-es';
import { Subject, takeUntil } from 'rxjs';

import { EcDatagridFilter } from '../common/directives/datagrid-filter.directive';
import { FilterState } from '../common/interfaces/filter-state.interface';

import { DateTimeGroupComponent } from './components/date-time-group';
import { ALL_TIME } from './constants';
import { CustomTimeRange, FilterValue, TimeRangePreset } from './interfaces';
import { containsAllTimePreset, getDefaultPreset, getFilterTimestamps } from './utils';

const TIMERANGE_FILTER_DEFAULTS = {
  widthPx: 225,
};

@Component({
  selector: 'ec-time-range-filter',
  templateUrl: './time-range-filter.component.html',
  styleUrls: ['./time-range-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrRadioModule,
    DateTimeGroupComponent,
  ],
  providers: [
    {
      provide: EcDatagridFilter,
      useExisting: TimeRangeFilterComponent,
    },
  ],
})
export class TimeRangeFilterComponent extends EcDatagridFilter<FilterValue>
  implements OnChanges, OnDestroy, OnInit {
  // TODO: add { required: true } after upgrading to Angular 16
  @Input()
  public propertyKey!: string;

  @Input()
  public closeOnChange: boolean = true;

  @Input()
  public presets: TimeRangePreset[] = [];

  @Input()
  public value?: FilterValue;

  @Input()
  public widthPx: number = TIMERANGE_FILTER_DEFAULTS.widthPx;

  @Input()
  public withCustomRange: boolean = false;

  @Output()
  public filterValueChanged: EventEmitter<FilterState<FilterValue>> = new EventEmitter();

  // TODO: Add possibility to set any custom range (not only ALL_TIME) as the default filter value

  protected readonly radioControl = new FormControl<string | null>(null);

  protected configErrors: string[] = [];

  protected defaultPreset: FilterValue['preset'] = null;
  protected filterValue: FilterValue = {
    preset: null,
    custom: ALL_TIME,
  };
  protected visualCustomRange: CustomTimeRange = ALL_TIME;
  protected hasAllTimePreset = false;

  public override readonly changes = new Subject<void>();

  public override get state(): FilterState<FilterValue> {
    return {
      property: this.propertyKey,
      value: this.filterValue,
    };
  }

  private readonly destroy$ = new Subject<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() private clrDatagridFilterContainer?: ClrDatagridFilter,
    @Optional() private clrPopoverToggleService?: ClrPopoverToggleService,
  ) {
    super();
    this.clrDatagridFilterContainer?.setFilter(this);
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

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.configErrors = this.checkInputsValidity();

    // Mark as initially touched to prevent a NG0100 error for 'ng-untouched' property
    // when [closeOnChange]="true" and the formControl's value changed for the fist time
    this.radioControl.markAsTouched();

    this.radioControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.onPresetSelected(value));

    this.clrPopoverToggleService?.openChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(open => {
        if (open) {
          this.updateVisualCustomRange();
          return;
        }
        if (this.radioControl.value === null) {
          this.onCustomRangeDiscard();
        }
      });
  }

  public override accepts(): boolean {
    return false;
  }

  public override clearSelection(): void {
    this.resetToDefault();
  }

  public override isActive(): boolean {
    return (
      this.filterValue.preset !== this.defaultPreset ||
      this.filterValue.preset === null && (
        !!this.filterValue.custom.start || !!this.filterValue.custom.end
      )
    );
  }

  public override resetToDefault(): void {
    if (this.defaultPreset !== null) {
      this.onPresetSelected(this.defaultPreset);
      return;
    }

    this.setValue({
      preset: null,
      custom: ALL_TIME,
    });

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  public override setValue(value: FilterValue): void {
    this.updateFilterValue(value);
    this.updateVisualCustomRange();

    if (this.radioControl.value !== this.filterValue.preset) {
      this.radioControl.setValue(this.filterValue.preset, { emitEvent: false });
    }
  }

  protected onCustomRangeApply(range: CustomTimeRange): void {
    this.setValue({
      preset: null,
      custom: range,
    });

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  protected onCustomRangeDiscard(): void {
    this.updateVisualCustomRange();

    if (this.filterValue.preset !== null) {
      this.radioControl.setValue(this.filterValue.preset);
    }

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  private checkInputsValidity(): string[] {
    if (this.propertyKey) {
      return [];
    }
    return ['[propertyKey] is required'];
  }

  private hideFilter(): void {
    if (this.clrPopoverToggleService?.open) {
      this.clrPopoverToggleService.open = false;
    }
  }

  private onPresetsChange(): void {
    this.defaultPreset = getDefaultPreset(this.presets)?.label ?? null;
    this.hasAllTimePreset = containsAllTimePreset(this.presets);

    if (this.value) {
      this.setValue(this.value);
      return;
    }

    if (this.defaultPreset !== null) {
      this.resetToDefault();
      return;
    }

    if (this.filterValue.preset === null) {
      return;
    }

    if (this.presets.some(preset => preset.label === this.filterValue.preset)) {
      this.onPresetSelected(this.filterValue.preset);
      return;
    }

    this.resetToDefault();
  }

  private onPresetSelected(presetLabel: string | null): void {
    if (presetLabel === null) {
      return;
    }

    this.setValue({
      preset: presetLabel,
      custom: ALL_TIME,
    });

    if (this.closeOnChange) {
      this.hideFilter();
    }
  }

  private updateFilterValue(newValue: FilterValue): void {
    if (isEqual(newValue, this.filterValue)) {
      return;
    }
    this.filterValue = newValue;
    this.filterValueChanged.emit(this.state);
    this.changes.next();
    this.changeDetectorRef.markForCheck();
  }

  private updateVisualCustomRange(): void {
    this.visualCustomRange = getFilterTimestamps(this.filterValue, this.presets);
    this.changeDetectorRef.markForCheck();
  }
}
