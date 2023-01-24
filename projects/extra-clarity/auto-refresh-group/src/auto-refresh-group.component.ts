import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ClarityIcons, errorStandardIcon, refreshIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { AutoRefreshComponent } from '@extrawest/extra-clarity/auto-refresh';

ClarityIcons.addIcons(refreshIcon, errorStandardIcon);

@Component({
  selector: 'ec-auto-refresh-group',
  templateUrl: './auto-refresh-group.component.html',
  styleUrls: ['./auto-refresh-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    AutoRefreshComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutoRefreshGroupComponent implements OnChanges {
  @Input() public failed = false;
  @Input() public refreshing = false;
  @Input() public autoRefreshBlocked = false;
  @Input() public autoRefreshEnabled = true;
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
