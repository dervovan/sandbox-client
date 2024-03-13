import clsx from "clsx";
import styles from "./index.module.scss";
import { onMouseOver } from "./board";
import React from "react";

const SQUARE_SIZE = 7;

type Props = {
  isAlive: number;
  rowIndex: number;
  cellIndex: number;
  onMouseOver: onMouseOver | null;
  onMouseClick: onMouseOver | null;
};

const Cell: React.FC<Props> = ({
  isAlive,
  rowIndex,
  cellIndex,
  onMouseOver,
  onMouseClick,
}) => {
  const mouseOver = (e: React.MouseEvent) => {
    e.buttons === 1 && onMouseOver?.({ rowIndex, cellIndex });
  };

  const mouseClick = () => {
    if (onMouseOver) {
      onMouseOver({ rowIndex, cellIndex });
      return;
    }
    onMouseClick?.({ rowIndex, cellIndex });
  };

  return (
    <rect
      className={clsx(styles.cell, isAlive && styles.alive)}
      x={cellIndex * SQUARE_SIZE}
      y={rowIndex * SQUARE_SIZE}
      onMouseEnter={mouseOver}
      onClick={mouseClick}
    ></rect>
  );
};

export default React.memo(Cell);
