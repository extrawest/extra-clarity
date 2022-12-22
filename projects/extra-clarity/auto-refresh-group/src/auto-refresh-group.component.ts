import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ec-auto-refresh-group',
  templateUrl: './auto-refresh-group.component.html',
  styleUrls: ['./auto-refresh-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoRefreshGroupComponent implements OnChanges {
  @Input() public failed = false;
  @Input() public refreshing = false;
  @Input() public autoRefreshBlocked = false;
  @Input() public autoRefreshEnabled = true;
  @Input() public autoRefreshState = false;
  @Input() public period = 60;
  @Input() public useAutoRefresh = true;

  @Output() public readonly refresh = new EventEmitter<void>();
  @Output() public readonly autoRefreshToggled = new EventEmitter<boolean>();

  public lastFetchTimestamp = Date.now();

  public ngOnChanges(changes: SimpleChanges): void {
    if (('refreshing' in changes) && !changes['refreshing'].currentValue) {
      this.lastFetchTimestamp = Date.now();
    }
  }

  public onAutoRefreshChanged(state: boolean): void {
    this.autoRefreshToggled.emit(state);
  }

  public onRefresh(): void {
    this.refresh.emit();
  }
}
