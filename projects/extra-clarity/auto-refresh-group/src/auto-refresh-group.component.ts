import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  OnChanges,
  SimpleChanges,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { ClarityIcons, errorStandardIcon, refreshIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

import { EcAutoRefreshComponent } from '@extrawest/extra-clarity/auto-refresh';

export const DEFAULT_PERIOD_SEC = 60;

@Component({
  selector: 'ec-auto-refresh-group',
  imports: [ClrIconModule, EcAutoRefreshComponent],
  templateUrl: './auto-refresh-group.component.html',
  styleUrls: ['./auto-refresh-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcAutoRefreshGroupComponent implements OnChanges {
  /**
   * Code of the locale (e.g. 'en-US', 'pl', etc.) to format timestamps within the refresh button.
   *
   * This feature uses the 'formatDate' function from '@angular/common' under the hood and thus
   * requires Angular's locale data to be registered preliminary in your main app.
   *
   * Please refer to https://angular.io/api/common/registerLocaleData for more information.
   *
   * When this input is not provided with any value, the LOCALE_ID token is used instead.
   *
   * The American English locale 'en-US' is used as the fallback locale for error cases.
   * It does not require the locale data registration as it's shipped with Angular out of the box.
   * */
  public readonly locale = input<string>();

  public readonly failed = input<boolean>(false);

  public readonly refreshing = input<boolean>(false);

  public readonly autoRefreshBlocked = input<boolean>(false);

  public readonly autoRefreshEnabled = input<boolean>(true);

  /** Refreshing period in seconds */
  public readonly period = input<number>(DEFAULT_PERIOD_SEC);

  public readonly useAutoRefresh = input<boolean>(true);

  /** `EventEmitter<void>` */
  public readonly refresh = output<void>();

  /** `EventEmitter<boolean>` */
  public readonly autoRefreshToggled = output<boolean>();

  protected lastFetchTimestamp = signal(this.formatTimestamp(Date.now()));

  private readonly localeId = inject(LOCALE_ID);

  constructor() {
    ClarityIcons.addIcons(refreshIcon, errorStandardIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshing']) {
      this.lastFetchTimestamp.set(this.formatTimestamp(Date.now()));
    }
  }

  protected onAutoRefreshChanged(state: boolean): void {
    this.autoRefreshToggled.emit(state);
  }

  protected onRefresh(): void {
    this.refresh.emit();
  }

  private formatTimestamp(timestamp: number): string {
    const format = 'mediumTime';
    const fallbackLocale = 'en-US';
    const preferredLocale = (this.locale() ?? this.localeId) || fallbackLocale;

    try {
      return formatDate(timestamp, format, preferredLocale);
    } catch {
      try {
        return formatDate(timestamp, format, this.localeId);
      } catch {
        return formatDate(timestamp, format, fallbackLocale);
      }
    }
  }
}
