import { useState } from "react";
import Board from "./board";
import styles from "./index.module.scss";
import { Paper } from "@mui/material";
import useRipple from "./ripple/useRipple";
import ManagementPanel from "./management/managementPanel";
import useGol from "./golLogic/useGol";

const Gol = () => {
  const { currentBoard, onMouseClick } = useRipple();
  const { isRunning, toggleRun, onMouseOver, golBoard, resetGol } = useGol();
  const [activeTab, setTab] = useState(0);

  return (
    <Paper className={styles.container}>
      <section className={styles.boardArea}>
        <Board
          data={activeTab ? currentBoard : golBoard}
          onMouseOver={activeTab || isRunning ? null : onMouseOver}
          onMouseClick={activeTab ? onMouseClick : null}
        />
        <ManagementPanel
          activeTab={activeTab}
          setTab={setTab}
          onGolToggle={toggleRun}
          isGolRunning={isRunning}
          resetGol={resetGol}
        />
      </section>
    </Paper>
  );
};

export default Gol;
