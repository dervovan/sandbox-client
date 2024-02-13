/** @format */

import { Route, Routes } from "react-router-dom";
import styles from "./index.module.scss";
import Home from "../home";

export default function WorkArea() {
  return (
    <div className={styles.workArea}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
