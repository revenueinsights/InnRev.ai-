export function removeDuplicatedItemsFromArray<T, K extends keyof T>(
  array: T[],
  key?: K
): T[] {
  if (!array) return [];

  const isArrayOfObjects = array.every((item) => typeof item === 'object');

  if (!isArrayOfObjects) {
    return [...new Set(array)];
  } else {
    const objKey = (key ?? Object.keys(array[0] as object)[0]) as keyof T;

    return array.filter(
      (item, index, arr) =>
        arr.findIndex((i) => i[objKey] === item[objKey]) === index
    );
  }
}

export function alphabeticalSort<T extends object, K extends keyof T>(
  array: T[],
  sortingKey: K
): T[] {
  return array.sort((a, b) => {
    const nameA = String(a[sortingKey]).toLowerCase();
    const nameB = String(b[sortingKey]).toLowerCase();

    return nameA.localeCompare(nameB);
  });
}
