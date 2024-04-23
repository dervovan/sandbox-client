import { CellState } from "../../components/gol/types";

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

export const mergeStates = (arr1: CellState[], arr2: CellState[]) => {
  return arr1.map((el, i) => el | arr2[i]);
}

export const replaceItem = (arr: any[], item: any, index: number) => {
  if (index >= arr.length || index < 0) {
    return arr;
  }

  return [...arr.slice(0, index), item, ...arr.slice(index + 1)];
}