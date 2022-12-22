import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  BehaviorSubject,
  finalize,
  map,
  Observable, repeat,
  Subject,
  takeUntil, takeWhile,
  timer, withLatestFrom
} from "rxjs";
import {FormControl} from "@angular/forms";

const DEFAULT_PERIOD_SEC = 60;

@Component({
  selector: 'ec-auto-refresh',
  templateUrl: './auto-refresh.component.html',
  styleUrls: ['./auto-refresh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoRefreshComponent implements OnInit, OnDestroy {
  @Input() public refreshing: boolean;

  @Input()
  public set period(v: number) {
    if (v > 0) {
      this.period$.next(v);
    }
  }

  @Input()
  public set enabled(v: boolean) {
    this.toggleControl.patchValue(v);
  }

  @Input()
  public set blocked(value: boolean) {
    if (value) {
      this.toggleControl.disable();
    } else {
      this.toggleControl.enable();
    }
  }

  @Output() public readonly refresh = new EventEmitter<void>();
  @Output() public readonly toggle = new EventEmitter<boolean>();

  public readonly toggleControl = new FormControl<boolean>(false, { nonNullable: true });

  public time$: Observable<number>;

  private readonly timer$: Observable<number> = timer(0, 1000);
  private readonly period$: BehaviorSubject<number> = new BehaviorSubject(DEFAULT_PERIOD_SEC);
  private readonly destroy$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.time$ = this.timer$
      .pipe(
        withLatestFrom(this.period$),
        takeUntil(this.destroy$),
        map(([seconds, period]) => period - seconds),
        takeWhile((seconds) => seconds > 0),
        finalize(() => {
          if (!this.toggleControl.value) {
            this.refresh.emit();
          }
        }),
        repeat(),
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onToggle(): void {
    this.toggle.emit(this.toggleControl.value);
  }
}
