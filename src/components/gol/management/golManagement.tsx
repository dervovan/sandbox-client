import { Button } from "@mui/material";
import styles from "./management.module.scss";

type Props = {
  onGolToggle: () => void;
  isGolRunning: boolean;
  resetGol: () => void;
};

const GolManagement = ({ onGolToggle, isGolRunning, resetGol }: Props) => {
  return (
    <div className={styles.container}>
      <Button
        color={isGolRunning ? "primary" : "success"}
        variant="contained"
        onClick={onGolToggle}
      >
        {isGolRunning ? "Остановить GOL" : "Запустить GOL"}
      </Button>
      <Button
        color={"primary"}
        variant="contained"
        onClick={resetGol}
      >
        Сбросить поле
      </Button>
    </div>
  );
};

export default GolManagement;
