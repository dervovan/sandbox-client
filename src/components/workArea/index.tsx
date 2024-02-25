import { Route, Routes } from "react-router-dom";
import styles from "./index.module.scss";
import Home from "../home";
import Signup from "../signup";
import Signin from "../signin";

export default function WorkArea() {
  return (
    <div className={styles.workArea}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}
