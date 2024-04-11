import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
} from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, errorStandardIcon, refreshIcon } from '@cds/core/icon';
import { EcAutoRefreshComponent } from '@extrawest/extra-clarity/auto-refresh';

export const DEFAULT_PERIOD_SEC = 60;

@Component({
  selector: 'ec-auto-refresh-group',
  templateUrl: './auto-refresh-group.component.html',
  styleUrls: ['./auto-refresh-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
    EcAutoRefreshComponent,
  ],
})
export class EcAutoRefreshGroupComponent implements OnChanges {
  @Input()
  public failed = false;

  @Input()
  public refreshing = false;

  @Input()
  public autoRefreshBlocked = false;

  @Input()
  public autoRefreshEnabled = true;

  /** Refreshing period in seconds */
  @Input()
  public period = DEFAULT_PERIOD_SEC;

  @Input()
  public useAutoRefresh = true;

  /** `EventEmitter<void>` */
  @Output()
  public readonly refresh = new EventEmitter<void>();

  /** `EventEmitter<boolean>` */
  @Output()
  public readonly autoRefreshToggled = new EventEmitter<boolean>();

  protected lastFetchTimestamp = Date.now();

  constructor() {
    ClarityIcons.addIcons(refreshIcon, errorStandardIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (('refreshing' in changes) && !changes['refreshing'].currentValue) {
      this.lastFetchTimestamp = Date.now();
    }
  }

  protected onAutoRefreshChanged(state: boolean): void {
    this.autoRefreshToggled.emit(state);
  }

  protected onRefresh(): void {
    this.refresh.emit();
  }
}
