export const safeUpdate = (
  arr: Array<unknown>,
  index: number,
  value: unknown
): Array<unknown> => {
  if (index >= arr.length || index < 0) {
    return arr;
  }

  arr[index] = value;

  return arr;
};
