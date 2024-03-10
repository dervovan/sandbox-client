import { useCallback, useState } from "react";
import Board, { onMouseOver } from "./board";
import styles from "./index.module.scss";
import { CellState } from "./golLogic";
import { Paper } from "@mui/material";
import { waterRipple } from "./rippleLogic";

export const BOARD_SIZE = 10;

const Gol = () => {
  const dataInit: Array<Array<CellState>> =
    (JSON.parse(localStorage.getItem("gol") || "null") as Array<
      Array<CellState>
    >) ||
    Array<Array<CellState>>(BOARD_SIZE).fill(
      Array<CellState>(BOARD_SIZE).fill(0)
    );
  const [data, setData] = useState(dataInit);

  const onMouseOver: onMouseOver = useCallback(
    ({ cellIndex, rowIndex }): void => {
      // const newData = JSON.parse(JSON.stringify(data));
      // newData[rowIndex][cellIndex] = !newData[rowIndex][cellIndex] ? 1 : 0;
      setData((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        newData[rowIndex][cellIndex] = !newData[rowIndex][cellIndex] ? 1 : 0;
        return newData;
      });
    },
    []
  );

  const onMouseClick: onMouseOver = useCallback(
    ({ cellIndex, rowIndex }): void => {
      setData((prevData) => {
        return waterRipple(prevData, {cellIndex, rowIndex});
      });
    },
    []
  );

  return (
    <Paper className={styles.container}>
      <section>
        <Board data={data} onMouseOver={onMouseClick} />
      </section>
    </Paper>
  );
};

export default Gol;
