import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  input,
  output,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';

import { ALL_TIME } from '../../constants';
import { EcCustomTimeRange } from '../../interfaces';
import { EcDateTimeInputComponent } from '../date-time-input';

@Component({
  selector: 'ec-date-time-group',
  templateUrl: './date-time-group.component.html',
  styleUrls: ['./date-time-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EcDateTimeInputComponent],
})
export class EcDateTimeGroupComponent implements OnChanges, OnInit {
  public readonly disabled = input<boolean>(false);
  public readonly forceEnabledButtons = input<boolean>(false);
  public readonly value = input<EcCustomTimeRange>();
  public readonly withTime = input<boolean>(true);

  public readonly apply = output<EcCustomTimeRange>();
  public readonly discard = output<void>();

  protected readonly inputStart = viewChild.required('inputStart', {
    read: EcDateTimeInputComponent,
  });

  protected readonly inputEnd = viewChild.required('inputEnd', {
    read: EcDateTimeInputComponent,
  });

  protected storedRange: EcCustomTimeRange = ALL_TIME;
  protected visualRange: EcCustomTimeRange = ALL_TIME;

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  protected get isAnyInputInvalid(): boolean {
    return this.inputEnd().formControl.invalid || this.inputStart().formControl.invalid;
  }

  protected get isRangeModified(): boolean {
    return (
      this.visualRange.end !== this.storedRange.end ||
      this.visualRange.start !== this.storedRange.start
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value = this.value();
    if (changes['value'] && value) {
      this.visualRange = { ...value };
      this.storedRange = { ...value };
    }
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  protected onApply(): void {
    if (!this.inputStart().formControl.valid || !this.inputEnd().formControl.valid) {
      return;
    }

    // Floor timestamps to minutes as we don't have seconds in visual time pickers

    this.storedRange = {
      start: this.floorToMinutes(this.visualRange.start),
      end: this.floorToMinutes(this.visualRange.end),
    };

    this.apply.emit(this.storedRange);
  }

  protected onDiscard(): void {
    // Force restoring a valid input state when the 'value' was not actually changed,
    // but something invalid/incomplete was entered
    if (this.visualRange.start === this.storedRange.start) {
      this.inputStart().restoreInputValue();
    }
    if (this.visualRange.end === this.storedRange.end) {
      this.inputEnd().restoreInputValue();
    }
    this.visualRange = { ...this.storedRange };
    this.discard.emit();
  }

  private floorToMinutes(timestamp: number | null): number | null {
    return timestamp === null ? null : new Date(timestamp).setSeconds(0, 0);
  }
}
