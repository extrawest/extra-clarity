import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'ec-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  host: {
    '[class.progress-spinner-overlay]': '_showSpinner',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ProgressSpinnerComponent implements OnDestroy {
  @Input() size = 'sm';

  _showSpinner: boolean;

  private static readonly MINIMUM_VISIBLE_DURATION = 200;
  private startTimestamp?: number;
  private hideTimeout?: number;

  @Input()
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
    this.hideTimeout = window.setTimeout(() => {
      this.startTimestamp = undefined;
      this._showSpinner = false;
      this.changeDetectorRef.markForCheck();
    }, this.getRemainingVisibleTime());
  }

  private getRemainingVisibleTime(): number {
    return Math.max(0, ProgressSpinnerComponent.MINIMUM_VISIBLE_DURATION - this.getVisibleTime());
  }

  private getVisibleTime(): number {
    if (!this.startTimestamp) {
      return 0;
    } else {
      return new Date().getTime() - this.startTimestamp;
    }
  }
}
