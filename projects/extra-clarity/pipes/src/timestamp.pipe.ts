import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp',
  standalone: true,
})
export class TimestampPipe implements PipeTransform {
  readonly appLocale = inject(LOCALE_ID);

  transform(
    value: Date | string | number | null | undefined,
    precision: 'min' | 'sec' | 'ms' = 'sec',
    locale: string = this.appLocale,
  ): string | null {
    if (!value) {
      return null;
    }
    return new Date(value).toLocaleDateString(locale, {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: precision === 'min' ? undefined : '2-digit',
      fractionalSecondDigits: precision === 'ms' ? 3 : undefined,
    });
  }
}
