import { NgZone } from '@angular/core';
import { asyncScheduler, interval, Observable, SchedulerLike, Subscription, timer } from 'rxjs';
import { observeOn } from 'rxjs/operators';

class OutsideAngularZoneScheduler implements SchedulerLike {
  constructor(private zone: NgZone, private scheduler: SchedulerLike) {}

  now(): number {
    return this.scheduler.now();
  }

  schedule(...args: any[]): Subscription {
    // @ts-ignore
    return this.zone.runOutsideAngular(() => this.scheduler.schedule.apply(this.scheduler, args));
  }
}

class InsideAngularZoneScheduler implements SchedulerLike {
  constructor(private zone: NgZone, private scheduler: SchedulerLike) {}

  now(): number {
    return this.scheduler.now();
  }

  schedule(...args: any[]): Subscription {
    // @ts-ignore
    return this.zone.run(() => this.scheduler.schedule.apply(this.scheduler, args));
  }
}

export function zonedTimer(dueTime: number | Date, zone: NgZone): Observable<number> {
  return timer(dueTime, new OutsideAngularZoneScheduler(zone, asyncScheduler)).pipe(
    observeOn(new InsideAngularZoneScheduler(zone, asyncScheduler)),
  );
}

export function zonedInterval(period: number, zone: NgZone): Observable<number> {
  return interval(period, new OutsideAngularZoneScheduler(zone, asyncScheduler)).pipe(
    observeOn(new InsideAngularZoneScheduler(zone, asyncScheduler)),
  );
}
