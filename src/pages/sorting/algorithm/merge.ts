import { Dispatch, SetStateAction } from "react";
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

export const mergeSortAnimations = (
  animations: AnimationData[],
  setCurrentAnimation: (index: number) => void,
  setData: Dispatch<SetStateAction<SortingElement[]>>,
  handleFinish: () => void,
  setTimeouts: (arg0: ReturnType<typeof setTimeout>[]) => void,
  speed: number
) => {
  if (animations.length) {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i <= animations.length; i++) {
      const time: ReturnType<typeof setTimeout> = setTimeout(() => {
        setCurrentAnimation(i);
        setData((prevData: SortingElement[]) => {
          let newData = prevData.map((i: any) => ({ ...i, isComparing: false }));
          if (animations[i]) {
            newData[animations[i].index!].value = animations[i].value;
            newData[animations[i].firstCompare!].isComparing = true;
            newData[animations[i].secondCompare].isComparing = true;
          } else {
            handleFinish();
          }
          return newData;
        });
      }, i * speed);
      timeouts.push(time);
    }
    setTimeouts(timeouts);
  }
};
