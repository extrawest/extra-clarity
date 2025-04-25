/** whether dateA is after dateB */
export function isAfter(dateA: string, dateB: string): boolean {
  return dateA.localeCompare(dateB, 'en-US') > 0;
}

/** whether dateA is before dateB */
export function isBefore(dateA: string, dateB: string): boolean {
  return dateA.localeCompare(dateB, 'en-US') < 0;
}

/** whether dateA is the same as dateB */
export function isSame(dateA: string, dateB: string): boolean {
  return dateA === dateB;
}

/** whether dateA is the same or after dateB */
export function isSameOrAfter(dateA: string, dateB: string): boolean {
  return isSame(dateA, dateB) || isAfter(dateA, dateB);
}

/** whether dateA is the same or before dateB */
export function isSameOrBefore(dateA: string, dateB: string): boolean {
  return isSame(dateA, dateB) || isBefore(dateA, dateB);
}
