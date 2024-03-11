import { mergeStates, safeUpdate } from "../../../utility/array";
import { CellState, Board, RippleEntry, RippleTicResult } from "../types";
import { Ripple } from "../types";

export const BOARD_SIZE = 70;
export const MAX_CIRCLE_SIZE = 15;

type rowHandleParams = {
  currentIndex: number;
  currentRow: Array<CellState>;
  topRow: Array<CellState>;
  bottomRow: Array<CellState>;
  rippleCenter: Ripple;
};

export const waterRippleTic = (
  rippleCenter: Ripple,
  board?: Board
): RippleTicResult => {
  const initRes = initRippleState(rippleCenter, board);
  const { board: newBoard, isFinished } = initRes;

  if (isFinished) {
    return initRes;
  }

  let oversized = false;

  for (let i = 0; i < newBoard.length; i++) {
    const { isLastRow, isOversized } = handleRow({
      currentIndex: i,
      topRow: newBoard[i - 1],
      currentRow: newBoard[i],
      bottomRow: newBoard[i + 1],
      rippleCenter,
    });

    if (isLastRow || isOversized) {
      oversized = !!isOversized;
      break;
    }
  }

  return {
    board: newBoard,
    isFinished: oversized,
  };
};

const handleRow = ({
  currentIndex,
  currentRow,
  topRow,
  bottomRow,
  rippleCenter: { cellIndex, rowIndex },
}: rowHandleParams): { isLastRow?: boolean; isOversized?: boolean } => {
  for (let i = 0; i < currentRow.length; i++) {
    if (!currentRow[i]) continue;
    currentRow[i] = 0;
    if (i > cellIndex) {
      if (i - cellIndex > MAX_CIRCLE_SIZE) {
        return {
          isOversized: true,
        };
      }
      safeUpdate(currentRow, i + 1, 1);
      return {};
    } else if (i < cellIndex) {
      if (cellIndex - i > MAX_CIRCLE_SIZE) {
        return {
          isOversized: true,
        };
      }
      safeUpdate(currentRow, i - 1, 1);
    } else {
      safeUpdate(currentRow, i - 1, 1);
      safeUpdate(currentRow, i + 1, 1);
      if (currentIndex < rowIndex && topRow) {
        topRow[i] = 1;
      } else if (currentIndex > rowIndex && bottomRow) {
        bottomRow[i] = 1;
        return { isLastRow: true };
      } else if (currentIndex === rowIndex) {
        if (bottomRow) {
          bottomRow[i] = 1;
        }
        if (topRow) {
          topRow[i] = 1;
        }
        return { isLastRow: true };
      }
      break;
    }
  }
  return {};
};

export const initRippleState = (
  rippleCenter: Ripple,
  board?: Board
): RippleTicResult => {
  if (board) {
    if (
      !!board.some((row) => {
        return row.some((cell) => !!cell);
      })
    ) {
      return {
        board: JSON.parse(JSON.stringify(board)),
        isFinished: false,
      };
    } else {
      return {
        board: board,
        isFinished: true,
      };
    }
  }

  const { cellIndex, rowIndex } = rippleCenter;
  const newBoard = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0)
  );

  newBoard[rowIndex][cellIndex] = 1;
  return {
    board: newBoard,
    isFinished: false,
  };
};

export const mergeRipples = (boards: Board[]): Board => {
  if (boards?.length <= 1) {
    return boards?.[0];
  }

  return boards.slice(1).reduce((acc, cur): Board => {
    return acc.map((line, i) => {
      return mergeStates(line, cur[i]);
    }) as Board;
  }, boards?.[0]);
};

interface IRippleState {
  lastRippleIndex: number;
  currentRipples: Record<string, RippleEntry>;
  addEntry: (ripple: RippleEntry) => void;
}

class RippleState implements IRippleState {
  currentRipples: Record<number, RippleEntry>;
  lastRippleIndex: number;

  constructor() {
    this.lastRippleIndex = -1;
    this.currentRipples = {};
  }

  addEntry = (state: RippleEntry) => {
    this.lastRippleIndex += 1;
    this.currentRipples[this.lastRippleIndex] = state;
  };
}
