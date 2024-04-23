import { AnimationData, SortingElement } from "../types";

function merge(
  left: SortingElement[],
  right: SortingElement[],
  iterations: AnimationData[]
): SortingElement[] {
  const result = [];
  const currentAll = [...left, ...right];

  console.log(
    "left-right",
    left.map((i) => i.value),
    right.map((i) => i.value)
  );
  console.log("+left-right+", left, right);

  while (currentAll.length) {
    const currentValues = currentAll.map((i: SortingElement) => i.value);
    const maxValueIndex = currentValues.lastIndexOf(Math.max(...currentValues));

    const leftAnimationItem = { ...currentAll[maxValueIndex] };
    const rightAnimationItem = { ...currentAll[currentAll.length - 1] };

    const animationItem: AnimationData | null =
      leftAnimationItem.index !== rightAnimationItem.index
        ? {
            left: leftAnimationItem,
            right: rightAnimationItem,
            isSwapped: true,
          }
        : null;

    currentAll[maxValueIndex] = { ...rightAnimationItem };
    currentAll.pop();

    animationItem && iterations.push(animationItem);
  }

  while (left.length && right.length) {
    const leftItem = left[left.length - 1];
    const rightItem = right[right.length - 1];
    if (leftItem.value > rightItem.value) {
      result.push(left.pop()!);
    } else {
      result.push(right.pop()!);
    }
  }
  // подумать как избавиться от reverse, 
  return [...left, ...right, ...result.reverse()];
}

export function mergeSort(
  arr: SortingElement[],
  iterations: AnimationData[]
): SortingElement[] {
  if (arr.length < 2) {
    return arr;
  }

  const left = arr.slice(0, arr.length / 2);
  const right = arr.slice(arr.length / 2);

  const result = merge(
    mergeSort(left, iterations),
    mergeSort(right, iterations),
    iterations
  );

  return result;
}
