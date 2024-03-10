import { BOARD_SIZE } from ".";
import { safeUpdate } from "../../utility/array";
import { CellState } from "./golLogic";

type rippleCenter = {
  cellIndex: number;
  rowIndex: number;
};

type rowHandleParams = {
  currentIndex: number;
  currentRow: Array<CellState>;
  topRow: Array<CellState>;
  bottomRow: Array<CellState>;
  rippleCenter: rippleCenter;
};

type handleRowResult = {
  isLastProcessed: boolean;
  topRow?: Array<CellState>;
  currentRow: Array<CellState>;
  bottomRow?: Array<CellState>;
};

export const waterRipple = (
  board: Array<Array<CellState>>,
  rippleCenter: rippleCenter
) => {
  const newBoard = initRippleState(board, rippleCenter);
  const copy = JSON.parse(JSON.stringify(newBoard));
  for (let i = 0; i < copy.length; i++) {
    const result = handleRow({
      currentIndex: i,
      topRow: copy[i - 1],
      currentRow: copy[i],
      bottomRow: copy[i + 1],
      rippleCenter,
    });

    newBoard[i] = result.currentRow;
    if (result.topRow) newBoard[i - 1] = result.topRow;
    if (result.bottomRow) newBoard[i + 1] = result.bottomRow;

    if (result.isLastProcessed) break;
  }

  return newBoard;
};

const handleRow = ({
  currentIndex,
  currentRow,
  topRow,
  bottomRow,
  rippleCenter: { cellIndex, rowIndex },
}: rowHandleParams): handleRowResult => {
  const result: handleRowResult = {
    currentRow: [...currentRow],
    isLastProcessed: false,
  };

  for (let i = 0; i < currentRow.length; i++) {
    if (!currentRow[i]) continue;
    result.currentRow[i] = 0;
    if (i > cellIndex) {
      safeUpdate(result.currentRow, i + 1, 1);
      break;
    } else if (i < cellIndex) {
      result.currentRow[i - 1] = 1;
    } else {
      safeUpdate(result.currentRow, i - 1, 1);
      safeUpdate(result.currentRow, i + 1, 1);
      if (currentIndex < rowIndex && topRow) {
        result.topRow = [...topRow];
        result.topRow[i] = 1;
      } else if (currentIndex > rowIndex && bottomRow) {
        result.bottomRow = [...bottomRow];
        result.bottomRow[i] = 1;
        result.isLastProcessed = true;
      } else if (currentIndex === rowIndex) {
        if (bottomRow) {
          result.bottomRow = [...bottomRow];
          result.bottomRow[i] = 1;
        }
        if (topRow) {
          result.topRow = [...topRow];
          result.topRow[i] = 1;
        }
        result.isLastProcessed = true;
      }
      break;
    }
  }

  return result;
};

const initRippleState = (
  board: CellState[][],
  rippleCenter: rippleCenter
): Array<Array<CellState>> => {
  if (
    board &&
    !!board.some((row) => {
      return row.some((cell) => !!cell);
    })
  ) {
    return JSON.parse(JSON.stringify(board));
  }

  const { cellIndex, rowIndex } = rippleCenter;
  const newBoard = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0)
  );

  newBoard[rowIndex][cellIndex] = 1;

  // if (newBoard[rowIndex - 1] !== undefined) {
  //   newBoard[rowIndex - 1][cellIndex] = 1;
  // }
  // if (newBoard[rowIndex]?.[cellIndex - 1] !== undefined) {
  //   newBoard[rowIndex][cellIndex - 1] = 1;
  // }
  // if (newBoard[rowIndex + 1] !== undefined) {
  //   newBoard[rowIndex + 1][cellIndex] = 1;
  // }
  // if (newBoard[rowIndex]?.[cellIndex + 1] !== undefined) {
  //   newBoard[rowIndex][cellIndex + 1] = 1;
  // }

  return newBoard;
};
