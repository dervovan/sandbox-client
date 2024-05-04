import clsx from "clsx";
import styles from "../index.module.scss";
import { SortingOrientation, SortingElement } from "../types";
import Column from "./column";

type Props = {
  data: SortingElement[];
  orientation: number;
};

const SortingContainer: React.FC<Props> = ({ data, orientation }) => {
  return (
    <div
      className={clsx(
        styles.sortingArea,
        styles[SortingOrientation[orientation]]
      )}
    >
      {data.map((i, index) => (
        <Column
          key={index}
          index={i.index}
          height={i.value}
          isComparing={i.isComparing}
        />
      ))}
    </div>
  );
};

export default SortingContainer;
