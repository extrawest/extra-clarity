const MS_IN_ONE_HOUR = 1000 * 60 * 60;
const MS_IN_ONE_DAY = MS_IN_ONE_HOUR * 24;

export function subtractDays(localDate: string, daysToSubtract: number): string {
  if (daysToSubtract === 0) {
    return localDate;
  }

  const [year, month, day] = localDate.split('-');

  const startOfSourceDayUtc = Date.UTC(Number(year), Number(month), Number(day));

  const startOfResultDayUtc = startOfSourceDayUtc - daysToSubtract * MS_IN_ONE_DAY;

  const resultDate = new Date(startOfResultDayUtc);

  const resultYear = resultDate.getUTCFullYear().toString().padStart(4, '0');
  const resultMonth = (resultDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const resultDay = resultDate.getUTCDate().toString().padStart(2, '0');

  return `${resultYear}-${resultMonth}-${resultDay}`;
}
