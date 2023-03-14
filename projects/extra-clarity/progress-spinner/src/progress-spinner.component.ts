import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ec-progress-spinner',
  template: `
    <ng-container *ngIf="_showSpinner">
      <span [class]="'spinner-' + size + ' spinner'"></span>
      <span>&nbsp;<ng-content></ng-content></span>
    </ng-container>
  `,
  host: {
    '[class.progress-spinner-overlay]': '_showSpinner',
  },
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrProgressSpinnerComponent implements OnDestroy {
  private static readonly MINIMUM_VISIBLE_DURATION = 200;
  private startTimestamp: number;
  private hideTimeout: any;

  @Input('clrSize') size = 'sm';

  _showSpinner: boolean;

  @Input('clrShowSpinner')
  set showSpinner(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    clearTimeout(this.hideTimeout);
  }

  private show(): void {
    clearTimeout(this.hideTimeout);
    this._showSpinner = true;
    this.startTimestamp = new Date().getTime();
  }

  private hide(): void {
    this.hideTimeout = setTimeout(() => {
      // @ts-ignore
      this.startTimestamp = undefined;
      this._showSpinner = false;
      this.changeDetectorRef.markForCheck();
    }, this.getRemainingVisibleTime());
  }

  private getRemainingVisibleTime(): number {
    return Math.max(0, ClrProgressSpinnerComponent.MINIMUM_VISIBLE_DURATION - this.getVisibleTime());
  }

  private getVisibleTime(): number {
    if (!this.startTimestamp) {
      return 0;
    } else {
      return new Date().getTime() - this.startTimestamp;
    }
  }
}
