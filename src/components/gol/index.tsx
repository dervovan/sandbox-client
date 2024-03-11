import { useCallback, useState } from "react";
import Board, { onMouseOver } from "./board";
import styles from "./index.module.scss";
import { Paper } from "@mui/material";
import useRipple from "./ripple/useRipple";

const Gol = () => {
  const { currentBoard, processRipple } = useRipple();

  const onMouseOver: onMouseOver = useCallback(
    ({ cellIndex, rowIndex }): void => {
      // const newData = JSON.parse(JSON.stringify(data));
      // newData[rowIndex][cellIndex] = !newData[rowIndex][cellIndex] ? 1 : 0;
      // setData((prevData) => {
      //   const newData = JSON.parse(JSON.stringify(prevData));
      //   newData[rowIndex][cellIndex] = !newData[rowIndex][cellIndex] ? 1 : 0;
      //   return newData;
      // });
    },
    []
  );

  const onMouseClick: onMouseOver = useCallback(
    ({ cellIndex, rowIndex }): void => {
      processRipple({ cellIndex, rowIndex });
    },
    []
  );

  return (
    <Paper className={styles.container}>
      <section>
        <Board data={currentBoard} onMouseOver={onMouseClick} />
      </section>
    </Paper>
  );
};

export default Gol;
