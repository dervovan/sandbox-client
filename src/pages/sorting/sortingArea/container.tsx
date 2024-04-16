import styles from "../index.module.scss";
import { SortingElement } from "../types";
import Column from "./column";

type Props = {
  data: Array<SortingElement>;
};

const SortingContainer: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.sortingArea}>
      {data.map((i) => (
        <Column
          key={i.index}
          index={i.index}
          height={i.value}
          isComparing={i.isComparing}
        />
      ))}
    </div>
  );
};

export default SortingContainer;
