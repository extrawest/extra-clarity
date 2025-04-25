import { localDateRegEx, localDateTimeRegEx } from './local-date-time-regex';

export function getIsoDateTimeUtc(localDateTime: string): string | null {
  if (localDateRegEx.test(localDateTime)) {
    return `${localDateTime}T00:00:00.000Z`;
  }

  if (localDateTimeRegEx.test(localDateTime)) {
    return `${localDateTime}:00.000Z`;
  }

  return null;
}
