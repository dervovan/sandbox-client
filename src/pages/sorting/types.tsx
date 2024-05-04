export type SortingElement = {
  index?: number;
  value: number;
  isComparing?: boolean;
};

export const SortingOrientation: Record<number, string> = {
  0: "top",
  1: "center",
  2: "bottom",
};

export type AnimationData = {
  index: number,
  value: number,
  firstCompare: number,
  secondCompare: number
};
