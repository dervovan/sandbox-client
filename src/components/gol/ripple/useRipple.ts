import { useEffect, useState } from "react";
import { Board, CellState, Ripple, RippleEntry } from "../types";
import { BOARD_SIZE, initRippleState, mergeRipples, waterRippleTic } from "./rippleLogic";

const dataInit: Board =
  (JSON.parse(localStorage.getItem("gol") || "null") as Array<
    Array<CellState>
  >) || Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

const useRipple = () => {
  const [ripples, setRipples] = useState<RippleEntry[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board>(dataInit);

  const addRipple = (ripple: RippleEntry) => {
    setRipples((prevRipples) => [...prevRipples, ripple]);
  };

  const resetRipples = () => {
    setRipples([]);
    setCurrentBoard(dataInit);
  };

  const processRipple = (ripple: Ripple) => {
    addRipple({
      center: ripple,
      board: initRippleState(ripple).board,
    });
  };

  useEffect(() => {
    if (ripples.length === 0) return;

    const timeout = setTimeout(() => {
      const calculated = ripples.map(entry => {
        const res = waterRippleTic(entry.center, entry.board)
        return {
          center: entry.center,
          ...res
        }
      })
      const toProcess = calculated.filter(i => !i.isFinished)
      if (toProcess.length === 0) {
        resetRipples()
        clearTimeout(timeout)
        return
      }

      const merged = mergeRipples(toProcess.map(x => x.board));
      setCurrentBoard(merged)
      setRipples(toProcess)
    }, 50);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [ripples]);

  return {
    processRipple,
    ripples,
    resetRipples,
    currentBoard,
  };
};

export default useRipple;
