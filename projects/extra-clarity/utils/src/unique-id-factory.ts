let instances = 0;

export function uniqueIdFactory(): string {
  return 'ec-id-' + instances++;
}
