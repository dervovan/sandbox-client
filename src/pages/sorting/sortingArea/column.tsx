import clsx from "clsx";
import styles from "../index.module.scss";

type Props = {
  height: number;
  index?: number;
  isComparing?: boolean;
};

const Column: React.FC<Props> = ({ height, isComparing }) => {
  return (
    <div
      style={{ height: `${height * 4}px` }}
      className={clsx(styles.column, isComparing && styles.isComparing)}
    ></div>
  );
};

export default Column;
