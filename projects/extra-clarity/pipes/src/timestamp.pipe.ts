import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'timestamp',
})
export class EcTimestampPipe implements PipeTransform {
  readonly appLocale = inject(LOCALE_ID);

  transform(
    value: Date | string | number | null | undefined,
    precision: 'min' | 'sec' | 'ms' = 'sec',
    locale?: string,
  ): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: precision === 'min' ? undefined : '2-digit',
      fractionalSecondDigits: precision === 'ms' ? 3 : undefined,
    };

    try {
      return date.toLocaleDateString(locale ?? this.appLocale, options);
    } catch {
      try {
        return date.toLocaleDateString(this.appLocale, options);
      } catch {
        return null;
      }
    }
  }
}
