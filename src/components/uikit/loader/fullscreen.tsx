import { CircularProgress, Portal } from "@mui/material";
import styles from "./fullscreen.module.scss";

const FullScreenLoader = () => {
  return (
    <Portal container={() => document.getElementById("root")}>
      <div className={styles.container}>
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      </div>
    </Portal>
  );
};

export default FullScreenLoader;
