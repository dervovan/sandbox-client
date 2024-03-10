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
};

export const waterRipple = (
  board: Array<Array<CellState>>,
  rippleCenter: rippleCenter
) => {
  const newBoard = initRippleState(board, rippleCenter);
  for (let i = 0; i < newBoard.length; i++) {
    const isLastProcessed = handleRow({
      currentIndex: i,
      topRow: newBoard[i - 1],
      currentRow: newBoard[i],
      bottomRow: newBoard[i + 1],
      rippleCenter,
    });

    if (isLastProcessed) break;
  }

  return newBoard;
};

const handleRow = ({
  currentIndex,
  currentRow,
  topRow,
  bottomRow,
  rippleCenter: { cellIndex, rowIndex },
}: rowHandleParams): boolean => {
  for (let i = 0; i < currentRow.length; i++) {
    if (!currentRow[i]) continue;
    currentRow[i] = 0;
    if (i > cellIndex) {
      safeUpdate(currentRow, i + 1, 1);
      return false;
    } else if (i < cellIndex) {
      safeUpdate(currentRow, i - 1, 1);
    } else {
      safeUpdate(currentRow, i - 1, 1);
      safeUpdate(currentRow, i + 1, 1);
      if (currentIndex < rowIndex && topRow) {
        topRow[i] = 1;
      } else if (currentIndex > rowIndex && bottomRow) {
        bottomRow[i] = 1;
        return true;
      } else if (currentIndex === rowIndex) {
        if (bottomRow) {
          bottomRow[i] = 1;
        }
        if (topRow) {
          topRow[i] = 1;
        }
        return true;
      }
      break;
    }
  }
  return false;
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
  return newBoard;
};
