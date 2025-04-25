import { getIsoDateTimeUtc } from './get-iso-date-time-utc';

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC',
} as const;

export function formatLocalTime(localDateTime: string | null, locale?: string | undefined): string {
  if (!localDateTime) {
    return '';
  }

  const isoDateTimeUtc = getIsoDateTimeUtc(localDateTime);
  if (!isoDateTimeUtc) {
    return '';
  }

  return new Date(isoDateTimeUtc).toLocaleString(locale, timeFormatOptions);
}
