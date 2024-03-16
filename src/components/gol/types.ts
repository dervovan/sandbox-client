export type Ripple = {
  cellIndex: number;
  rowIndex: number;
};
export type CellState = 1 | 0;

export type Board = CellState[][];

export type RippleEntry = {
  center: Ripple;
  board: Board;
};

export type RippleTicResult = {
  board: Board;
  isFinished: boolean;
};


export enum FigureType {
  Copperhead = 1,
  GliderGun = 2,
  SnarkLoop = 3,
  Lines = 4
}