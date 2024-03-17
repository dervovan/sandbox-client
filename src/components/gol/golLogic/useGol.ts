import { useCallback, useEffect, useState } from "react";
import { onMouseOver } from "../board";
import { Board, CellState, FigureType } from "../types";
import { BOARD_SIZE } from "../ripple/rippleLogic";
import { applyGOLRules } from "./golLogic";
import downloadToFile from "../../../utility/file/download";
import { Copperhead, GliderGun, SnarkLoop, Lines } from "./figures";
import useToast from "../../uikit/toasts/useToast";

export const dataInit: Board =
  (JSON.parse(localStorage.getItem("gol") || "null") as Array<
    Array<CellState>
  >) || Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

const useGol = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [golBoard, setGolBoard] = useState(dataInit);
  const {addToast} = useToast()

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

  const damp = () => {
    downloadToFile(JSON.stringify(golBoard), `GOL${new Date().valueOf()}`)
  }

  const uploadFromFile = (data: string) => {
    try {
      setGolBoard(JSON.parse(data) as Board)
    } catch (error) {
      addToast({message: `Что-то не так с файлом, попробуй другой`})
    }
  }

  const setFigure = (type: FigureType) => {
    switch (type) {
      case FigureType.Copperhead:
        setGolBoard(Copperhead)
        break;
      case FigureType.GliderGun:
        setGolBoard(GliderGun)
        break;
      case FigureType.SnarkLoop:
        setGolBoard(SnarkLoop)
        break;
      case FigureType.Lines:
        setGolBoard(Lines)
        break;
      default:
        break;
    }
  }

  return {
    isRunning,
    toggleRun,
    golBoard,
    onMouseOver,
    resetGol,
    damp,
    uploadFromFile,
    setFigure
  };
};

export default useGol;
