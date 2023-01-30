import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, finalize, map, noop, Observable, repeat, takeUntil, takeWhile, timer, withLatestFrom } from 'rxjs';

import { DEFAULT_PERIOD_SEC } from '../constants';

interface TimerConfig {
  period$: BehaviorSubject<number>;
  callback: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class AutoRefreshService implements OnDestroy {
  private registry: Map<string, Observable<number>> = new Map();

  private deleted = new EventEmitter();

  ngOnDestroy(): void {
    this.registry.clear();
    this.deleted.emit();
  }

  getTimer(
    timerId: string,
    timerConfig?: TimerConfig,
    forceNew = false,
  ): Observable<number> {
    let time$ = this.registry.get(timerId);

    if (time$ !== undefined && !forceNew) {
      return time$;
    }

    const defaultConfig = {
      period$: new BehaviorSubject(DEFAULT_PERIOD_SEC),
      callback: noop,
    };

    time$ = this.createTimer({
      ...defaultConfig,
      ...timerConfig,
    });

    this.registry.set(timerId, time$);

    return time$;
  }

  private createTimer({ period$, callback }: TimerConfig): Observable<number> {
    return timer(0, 1000).pipe(
      withLatestFrom(period$),
      takeUntil(this.deleted),
      map(([seconds, period]) => period - seconds),
      takeWhile((seconds) => seconds > 0),
      finalize(callback),
      repeat(),
    );
  }
}
