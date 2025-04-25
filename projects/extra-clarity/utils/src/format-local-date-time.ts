import { getIsoDateTimeUtc } from './get-iso-date-time-utc';

const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC',
} as const;

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'UTC',
} as const;

export function formatLocalDateTime(
  localDateTime: string | null,
  withTime: boolean,
  locale?: string | undefined,
): string {
  if (!localDateTime) {
    return '';
  }

  const isoDateTimeUtc = getIsoDateTimeUtc(localDateTime);
  if (!isoDateTimeUtc) {
    return '';
  }

  return new Date(isoDateTimeUtc).toLocaleString(
    locale,
    withTime ? dateTimeFormatOptions : dateFormatOptions,
  );
}
