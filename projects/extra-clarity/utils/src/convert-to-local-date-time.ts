/** convert to the format 'YYYY-MM-DDTHH:mm' used by 'datetime-local' inputs */
export function convertToLocalDateTime(
  date: number | string | Date,
  withTime: boolean,
  timeZone?: string,
): string {
  const timestamp = getTimestamp(date);
  if (!timestamp) {
    // TODO: maybe throw an error
    return '';
  }

  const sourceParts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).formatToParts(timestamp);

  const result = {
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  };

  sourceParts.forEach((part) => {
    switch (part.type) {
      case 'year':
        result.year = part.value.padStart(4, '0');
        return;

      case 'month':
      case 'day':
      case 'hour':
      case 'minute':
        result[part.type] = part.value;
        return;
    }
  });

  const isoDate = `${result.year}-${result.month}-${result.day}`;

  if (!withTime) {
    return isoDate;
  }

  const isoTime = `${result.hour}:${result.minute}`;

  return `${isoDate}T${isoTime}`;
}

function getTimestamp(date: unknown): number | null {
  if (date instanceof Date) {
    return date.getTime();
  }

  if (typeof date === 'number') {
    return date;
  }

  if (typeof date === 'string') {
    const timestamp = new Date(date).getTime();
    return isNaN(timestamp) ? null : timestamp;
  }

  return null;
}
