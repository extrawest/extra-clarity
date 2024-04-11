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
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClrCheckboxModule } from '@clr/angular';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { map, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';

export const DEFAULT_PERIOD_SEC = 60;

@Component({
  selector: 'ec-auto-refresh',
  templateUrl: './auto-refresh.component.html',
  styleUrls: ['./auto-refresh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrCheckboxModule,
  ],
})
export class EcAutoRefreshComponent implements OnChanges, OnDestroy, OnInit {
  /**
   * Indicate that refreshing is occurring at the moment.
   * The countdown is stopped and will be re-launched after this input is switched to `false`.
   * */
  @Input()
  public refreshing?: boolean;

  /** Refreshing period in seconds */
  @Input()
  public period = DEFAULT_PERIOD_SEC;

  /**
   * Whether auto-refreshing is active,
   * i.e. the timer is counting and the `refresh` output emits periodically
   * */
  @Input()
  public enabled?: boolean;

  /** Whether the toggle is blocked, i.e. the form control is disabled */
  @Input()
  public blocked?: boolean;

  /** Emits when the countdown timer reaches 0 */
  @Output()
  public readonly refresh = new EventEmitter<void>();

  /** Emits a new toggle state as a `boolean` every time it is changed */
  @Output()
  public readonly toggle = new EventEmitter<boolean>();

  protected readonly toggleControl = new FormControl<boolean>(false, { nonNullable: true });

  protected secondsRemaining = 0;
  protected _period = 0;

  private readonly abortTimer$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  protected get timeMessage(): string {
    return this.commonStrings.parse(
      this.commonStrings.keys.autoRefresh.message,
      { SEC: this.secondsRemaining.toString() },
    );
  }

  constructor(
    protected readonly commonStrings: EcCommonStringsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['period']) {
      this._period = this.period < 0 ? 0 : this.period;
    }

    if (changes['period'] || changes['blocked']) {
      this.blocked || this._period === 0
        ? this.toggleControl.disable()
        : this.toggleControl.enable();
    }

    if (changes['enabled'] || changes['period'] && this._period === 0) {
      const isEnabled = this.enabled ?? false;
      this.toggleControl.patchValue(isEnabled && this._period > 0);
    }

    if (changes['enabled'] || changes['refreshing']) {
      const isEnabled = this.enabled ?? false;
      this.resetTimerState(isEnabled && !this.refreshing);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.abortTimer$.complete();
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  protected onToggle(): void {
    this.resetTimerState(this.toggleControl.value);
    this.toggle.emit(this.toggleControl.value);
  }

  private launchTimer(): void {
    // delay for 1ms to let the external parent component
    // set the input [refreshing]="true" before the timer relaunches counting
    timer(1, 1000)
      .pipe(
        map(timeElapsed => this._period - timeElapsed),
        tap(timeRemain => {
          this.secondsRemaining = timeRemain < 0 ? 0 : timeRemain;
        }),
        takeWhile(timeRemain => timeRemain > 0, true),
        takeUntil(this.abortTimer$),
        takeUntil(this.destroy$),
      )
      .subscribe(timeRemain => {
        if (timeRemain <= 0) {
          this.refresh.emit();
          this.resetTimerState(true);
        }
        this.changeDetectorRef.markForCheck();
      });
  }

  private resetTimerState(launch: boolean): void {
    this.abortTimer$.next();

    if (
      launch &&
      this.toggleControl.value &&
      this._period > 0 &&
      !this.refreshing
    ) {
      this.launchTimer();
    }
  }
}
