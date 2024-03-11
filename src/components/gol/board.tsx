import clsx from "clsx";
import styles from "./index.module.scss";
import Row from "./row";
import { CellState } from "./types";
import Cell from "./cell";
import { Fragment } from "react";

type Props = {
  data: Array<Array<CellState>>;
  onMouseOver: onMouseOver;
};

export type onMouseOver = ({
  rowIndex,
  cellIndex,
}: {
  rowIndex: number;
  cellIndex: number;
}) => void;

const Board: React.FC<Props> = ({ data, onMouseOver }) => {
  return (
    <svg className={styles.board}>
      {data.map((row, index) => {
        // замена Row на Fragment не дает никакого выигрыша в производительности
        // return (<Fragment key={`row-${index}`}>
        //   {row.map((i, cellIndex) => {
        //     return (
        //       <Cell
        //         key={`${index}${cellIndex}`}
        //         isAlive={i}
        //         rowIndex={index}
        //         cellIndex={cellIndex}
        //         onMouseOver={onMouseOver}
        //       />
        //     );
        //   })}
        // </Fragment>
        // )
        return (
          <Row
            key={index}
            data={row}
            rowIndex={index}
            onMouseOver={onMouseOver}
          />
        );
      })}
    </svg>
  );
};

export default Board;
