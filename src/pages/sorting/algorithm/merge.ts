import { AnimationData, SortingElement } from "../types";

export const mergeSortAlgorithm = (
  arr: SortingElement[],
  animations: AnimationData[]
) => {
  const copy = arr.slice();
  mergeSort(arr, copy, 0, arr.length - 1, animations);
};

export function mergeSort(
  arr: SortingElement[],
  copyArr: SortingElement[],
  startIndex: number,
  endIndex: number,
  iterations: AnimationData[]
) {
  if (startIndex >= endIndex) {
    return;
  }

  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSort(copyArr, arr, startIndex, middleIndex, iterations);
  mergeSort(copyArr, arr, middleIndex + 1, endIndex, iterations);

  let r = startIndex,
    i = startIndex,
    j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    if (arr[i].value <= arr[j].value) {
      copyArr[r] = arr[i];
      iterations.push({
        index: r,
        firstCompare: i,
        secondCompare: j,
        value: copyArr[r].value,
      });
      r++;
      i++;
    } else {
      copyArr[r] = arr[j];
      iterations.push({
        index: r,
        firstCompare: i,
        secondCompare: j,
        value: copyArr[r].value,
      });
      r++;
      j++;
    }
  }

  while (i <= middleIndex) {
    copyArr[r] = arr[i];
    iterations.push({
      index: r,
      firstCompare: i,
      secondCompare: i,
      value: copyArr[r].value,
    });
    r++;
    i++;
  }

  while (j <= endIndex) {
    copyArr[r] = arr[j];
    iterations.push({
      index: r,
      firstCompare: j,
      secondCompare: j,
      value: copyArr[r].value,
    });
    r++;
    j++;
  }
}
