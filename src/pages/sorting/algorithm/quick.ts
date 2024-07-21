import { Dispatch, SetStateAction } from "react";
import { AnimationData, SortingElement } from "../types";

export const quickSortAlgorithm = (
  arr: SortingElement[],
  animations: AnimationData[]
) => {
  quickSort(arr.map(i => i.value), 0, arr.length - 1, animations);
};

export function quickSort(
  arr: number[],
  startIndex: number,
  endIndex: number,
  iterations: AnimationData[]
) {
  if (startIndex >= endIndex) {
    return;
  }

  const pivotIndex = startIndex;
  let storeIndex = pivotIndex + 1;
  let currentIndex = storeIndex;
  while (currentIndex <= endIndex) {
    if (arr[pivotIndex] >= arr[currentIndex]) {
      iterations.push({
        index: pivotIndex,
        firstCompare: storeIndex,
        secondCompare: currentIndex,
        value: arr[currentIndex],
        secondValue: arr[storeIndex],
      });
      // Swapping element at currentIndex with element at storeIndex.
      [arr[currentIndex], arr[storeIndex]] = [
        arr[storeIndex],
        arr[currentIndex],
      ];
      storeIndex++;
    } else {
      iterations.push({
        index: pivotIndex,
        firstCompare: pivotIndex,
        secondCompare: currentIndex,
      });
    }
    currentIndex++;
  }

  // Swapping pivot with element at storeIndex - 1.
  [arr[pivotIndex], arr[storeIndex - 1]] = [
    arr[storeIndex - 1],
    arr[pivotIndex],
  ];
  iterations.push({
    index: pivotIndex,
    firstCompare: pivotIndex,
    secondCompare: storeIndex - 1,
    value: arr[pivotIndex],
    secondValue: arr[storeIndex - 1],
  });

  quickSort(arr, startIndex, storeIndex - 2, iterations);
  quickSort(arr, storeIndex, endIndex, iterations);
}

export const quickSortAnimations = (
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
          let newData = prevData.map((i: any) => ({
            ...i,
            isComparing: false,
          }));
          if (animations[i]) {
            newData[animations[i].index].isComparing = true;
            newData[animations[i].firstCompare].isComparing = true;
            newData[animations[i].secondCompare].isComparing = true;

            if (animations[i].value && animations[i].secondValue) {
              newData[animations[i].firstCompare].value = animations[i].value;
              newData[animations[i].secondCompare].value = animations[i].secondValue;
            }
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
