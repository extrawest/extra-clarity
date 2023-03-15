import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrAlert } from '@clr/angular';
import { Subscription } from 'rxjs';

import { zonedInterval, zonedTimer } from './scheduler-utils';

@Component({
  selector: 'ec-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-200%)' }),
        animate('0.5s', style({ transform: 'translateY(0%)' })),
      ]),
    ]),
    trigger('move', [
      state('currentPosition', style({ transform: 'translateY({{absolute}}px)' }), { params: { absolute: '0' } }),
      state('moveUp', style({ transform: 'translateY({{absolute}}px)' }), { params: { absolute: '0' } }),
      state('moveDown', style({ transform: 'translateY({{absolute}}px)' }), { params: { absolute: '0' } }),
      transition('* => moveDown', animate('0.3s')),
      transition('* => moveUp', animate('0.3s')),
    ]),
    trigger('fade', [
      state('fadeOut', style({ transform: 'translateY({{absolute}}px)', opacity: 0 }), { params: { absolute: '0' } }),
      transition('* => fadeOut', animate('0.3s')),
    ]),
  ],
  host: {
    '[class.notification]': 'true',
  },
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
  ],
})
export class NotificationComponent implements OnInit {
  @ViewChild(ClrAlert, { static: true }) clrAlert: ClrAlert;
  progressStatus = 0;
  state: any;

  private step = 100;
  private startTime: number;
  private timer: Subscription;
  private interval: Subscription;

  private _translate = 0;
  get translate(): number {
    return this._translate;
  }

  private _height = 0;
  get height(): number {
    return this._height + 10;
  }

  private _heightInitalized: (value?: unknown) => void;
  heightInitalized = new Promise(resolve => {
    this._heightInitalized = resolve;
  });

  @Input() timeout = 2000;
  @Input() notificationType = 'info';
  @Input() dismissable = false;
  @Input() progressbar = false;

  @Output() readonly closed = new EventEmitter();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    zonedTimer(0, this.ngZone).subscribe(() => {
      this._height = this.elementRef.nativeElement.children[0].offsetHeight;
      this._heightInitalized();
    });

    if (this.timeout > 0) {
      if (this.progressbar) {
        this.startTime = new Date().getTime();
        this.interval = zonedInterval(this.timeout / (this.timeout / this.step), this.ngZone).subscribe(() =>
          this.updateProgressStatus(),
        );
      }

      this.timer = zonedTimer(this.timeout, this.ngZone).subscribe(() => this.close());
    }
  }

  public updateProgressStatus(): void {
    this.progressStatus = new Date().getTime() - this.startTime;
  }

  public close(): void {
    if (this.interval) {
      this.interval.unsubscribe();
    }
    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.clrAlert._closed = false;
    this.state = { value: 'fadeOut', params: { absolute: this._translate } };
    zonedTimer(300, this.ngZone).subscribe(() => this.closed.emit());
  }

  public moveDown(translateValue: number): void {
    this._translate += translateValue;
    this.state = { value: 'moveDown', params: { absolute: this._translate } };
    this.setCurrentPosition();
  }

  public moveUp(translateValue: number): void {
    this._translate -= translateValue;
    this.state = { value: 'moveUp', params: { absolute: this._translate } };
    this.setCurrentPosition();
  }

  private setCurrentPosition(): void {
    zonedTimer(300, this.ngZone).subscribe(
      () => (this.state = { value: 'currentPosition', params: { absolute: this._translate } }),
    );
  }
}
