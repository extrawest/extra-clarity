export function getTimestampAsISOString(timestamp: number | null | undefined): string | undefined {
  return timestamp ? new Date(timestamp).toISOString() : undefined;
}
