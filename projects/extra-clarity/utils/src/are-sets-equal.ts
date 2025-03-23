export function areSetsEqual<T>(
  set1: Set<T>,
  set2: Set<T>,
  params: { ignoreOrder: boolean } = { ignoreOrder: false },
): boolean {
  if (set1.size !== set2.size) {
    return false;
  }

  if (set1.size === 0) {
    return true;
  }

  if (params.ignoreOrder) {
    return Array.from(set1).every((value1) => set2.has(value1));
  }

  const valuesFromSet2 = set2.values();
  return Array.from(set1).every((value1) => value1 === valuesFromSet2.next().value);
}
