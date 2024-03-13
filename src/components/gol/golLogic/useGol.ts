import { useCallback, useEffect, useState } from "react";
import { onMouseOver } from "../board";
import { Board, CellState } from "../types";
import { BOARD_SIZE } from "../ripple/rippleLogic";
import { applyGOLRules } from "./golLogic";

export const dataInit: Board =
  (JSON.parse(localStorage.getItem("gol") || "null") as Array<
    Array<CellState>
  >) || Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

const useGol = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [golBoard, setGolBoard] = useState(dataInit);

  const toggleRun = () => {
    setIsRunning((prevState) => !prevState);
  };

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    timeout && clearTimeout(timeout);
    if (!isRunning) return;

    timeout = setTimeout(() => {
      setGolBoard(applyGOLRules(golBoard));
    }, 50);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isRunning, golBoard]);

  const onMouseOver: onMouseOver = useCallback(
    ({ cellIndex, rowIndex }): void => {
      setGolBoard((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        newData[rowIndex][cellIndex] = !newData[rowIndex][cellIndex] ? 1 : 0;
        return newData;
      });
    },
    []
  );

  const resetGol = () => {
    setGolBoard(dataInit);
    setIsRunning(false);
  };

  return {
    isRunning,
    toggleRun,
    golBoard,
    onMouseOver,
    resetGol,
  };
};

export default useGol;
