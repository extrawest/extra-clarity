import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import {
  BehaviorSubject,
  Subject,
  filter,
  finalize,
  interval,
  map,
  scan,
  take,
  takeUntil,
  takeWhile,
  withLatestFrom,
} from 'rxjs';

import { notificationAnimation } from '../../animations';
import { NOTIFICATION_ANIMATION_STATE_CONFIG } from '../../constants';
import { NotificationConfig, NotificationData } from '../../typings';

const NOTIFICATION_INTERVAL_STEP = 200;

@Component({
  selector: 'ec-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [notificationAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() instance: NotificationData;

  @Output() readonly destroyed = new EventEmitter<void>();

  readonly animationStateChanged$ = new Subject<AnimationEvent>();

  private _state: 'enter' | 'leave' = 'enter';

  private paused$ = new BehaviorSubject<boolean>(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  get config(): Required<NotificationConfig> {
    return this.instance.config as Required<NotificationConfig>;
  }

  get data(): Required<NotificationData> {
    return this.instance as Required<NotificationData>;
  }

  get state(): string {
    return this._state === 'enter'
      ? NOTIFICATION_ANIMATION_STATE_CONFIG[this.config.position]
      : this._state;
  }

  ngOnInit(): void {
    interval(NOTIFICATION_INTERVAL_STEP)
      .pipe(
        withLatestFrom(this.paused$),
        filter(([, paused]) => !paused),
        map(() => NOTIFICATION_INTERVAL_STEP),
        scan((acc: number, curr: number) => acc + curr, 0),
        takeWhile((value) => value < this.config.duration),
        takeUntil(this.destroy$),
        finalize(() => this.onClose()),
      )
      .subscribe();

    this.animationStateChanged$
      .pipe(
        filter((event) => event.phaseName === 'done' && event.toState === 'leave'),
        take(1),
      )
      .subscribe(() => {
        this.destroyed.emit();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.animationStateChanged$.complete();
  }

  onClose(): void {
    this._state = 'leave';
    this.changeDetectorRef.markForCheck();
  }

  onMouseEnter(): void {
    if (this.config.autoClose && this.config.pauseOnHover) {
      this.paused$.next(true);
    }
  }

  onMouseLeave(): void {
    if (this.config.autoClose && this.config.pauseOnHover) {
      this.paused$.next(false);
    }
  }
}
