import {Component, Input} from '@angular/core';

@Component({
  selector: 'storybook-auto-refresh-group',
  template: `
    <ec-auto-refresh-group
      [failed]="failed"
      [period]="period"
      [refreshing]="refreshing"
      [autoRefreshBlocked]="autoRefreshBlocked"
      [autoRefreshState]="autoRefreshState"
      [autoRefreshEnabled]="autoRefreshEnabled"
      [useAutoRefresh]="useAutoRefresh"
      (refresh)="onRefresh()"
      (autoRefreshToggled)="onAutoRefreshToggled($event)"
    ></ec-auto-refresh-group>
  `,
})
export class AutoRefreshGroupStoryComponent {
  @Input() public failed = false;
  @Input() public refreshing = false;
  @Input() public autoRefreshBlocked = false;
  @Input() public autoRefreshEnabled = true;
  @Input() public autoRefreshState = false;
  @Input() public period = 60;
  @Input() public useAutoRefresh = true;

  onRefresh(): void {
    console.log('onRefresh: ', true);
  }

  onAutoRefreshToggled(e: boolean): void {
    console.log('onAutoRefreshToggled: ', e);
  }
}
