import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClrCheckboxModule } from '@clr/angular';
import {
  BehaviorSubject,
  Observable,
  Subject,
} from 'rxjs';

import { DEFAULT_PERIOD_SEC, DEFAULT_TIMER_ID } from './constants';
import { AutoRefreshService } from './services';

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
export class AutoRefreshComponent implements OnInit, OnDestroy {
  @Input() public refreshing: boolean;

  @Input() timerId = DEFAULT_TIMER_ID;

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

  private readonly period$: BehaviorSubject<number> = new BehaviorSubject(DEFAULT_PERIOD_SEC);
  private readonly destroy$: Subject<void> = new Subject();

  constructor(private readonly autoRefreshService: AutoRefreshService) { }

  public ngOnInit(): void {
    this.time$ = this.autoRefreshService.getTimer(
      this.timerId,
      {
        period$: this.period$,
        callback: this.finalizeCallback.bind(this),
      },
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onToggle(): void {
    this.toggle.emit(this.toggleControl.value);
  }

  private finalizeCallback(): void {
    if (this.toggleControl.value) {
      this.refresh.emit();
    }
  }
}
