import { useState } from "react";
import Board from "./board";
import styles from "./index.module.scss";
import { Link, Paper, Typography } from "@mui/material";
import useRipple from "./ripple/useRipple";
import ManagementPanel from "./management/managementPanel";
import useGol from "./golLogic/useGol";

const Gol = () => {
  const { currentBoard, onMouseClick } = useRipple();
  const {
    isRunning,
    toggleRun,
    onMouseOver,
    golBoard,
    resetGol,
    damp,
    uploadFromFile,
    setFigure,
  } = useGol();
  const [activeTab, setTab] = useState(0);

  return (
    <Paper className={styles.container}>
      <Typography paddingBottom={2} variant="body1" component="div">
        Game of Life{" "}
        <Link href={"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"} target={"blank"}>
          wiki
        </Link>
        . Размер поля почти 5 тысяч элементов. Хороший способ проверить возможности ReactJS.
      </Typography>
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
          damp={damp}
          uploadFromFile={uploadFromFile}
          setFigure={setFigure}
        />
      </section>
    </Paper>
  );
};

export default Gol;
