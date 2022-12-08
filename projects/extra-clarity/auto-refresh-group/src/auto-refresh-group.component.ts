import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ew-auto-refresh-group',
  templateUrl: './auto-refresh-group.component.html',
  styleUrls: ['./auto-refresh-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoRefreshGroupComponent implements OnChanges {
  @Input() public failed = false;
  @Input() public refreshing = false;
  @Input() public autoRefreshBlocked = false;
  @Input() public autoRefreshDisabled = false;
  @Input() public autoRefreshState = false;
  @Input() public period = 60;
  @Input() public useAutoRefresh = true;

  @Output() refresh = new EventEmitter();
  @Output() autoRefreshToggled = new EventEmitter<boolean>();

  lastFetchTimestamp = Date.now();

  public ngOnChanges(changes: SimpleChanges): void {
    if (('loading' in changes) && !changes['loading'].currentValue) {
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
