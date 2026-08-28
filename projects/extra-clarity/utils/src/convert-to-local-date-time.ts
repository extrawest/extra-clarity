/** convert to the format 'YYYY-MM-DDTHH:mm' used by 'datetime-local' inputs */
export function convertToLocalDateTime(
  date: number | string | Date,
  withTime: boolean,
  timeZone?: string,
): string {
  const timestamp = getTimestamp(date);
  // getTimestamp() returns null for an unparsable date, while 0 is a valid timestamp
  if (timestamp === null) {
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
    return toFiniteOrNull(date.getTime());
  }

  if (typeof date === 'number') {
    return toFiniteOrNull(date);
  }

  if (typeof date === 'string') {
    return toFiniteOrNull(new Date(date).getTime());
  }

  return null;
}

/** an invalid Date, and NaN or Infinity as a number, are not timestamps Intl can format */
function toFiniteOrNull(timestamp: number): number | null {
  return Number.isFinite(timestamp) ? timestamp : null;
}
