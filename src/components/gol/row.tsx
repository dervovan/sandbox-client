import { onMouseOver } from "./board";
import Cell from "./cell";
import styles from "./index.module.scss";
import { CellState } from "./types";

type Props = {
  data: Array<CellState>;
  rowIndex: number;
  onMouseOver: onMouseOver;
};

const Row: React.FC<Props> = ({ data, rowIndex, onMouseOver }) => {
  return (
    <>
      {data.map((i, cellIndex) => {
        return (
          <Cell
            key={`${rowIndex}${cellIndex}`}
            isAlive={i}
            rowIndex={rowIndex}
            cellIndex={cellIndex}
            onMouseOver={onMouseOver}
          />
        );
      })}
    </>
  );
};

export default Row;
