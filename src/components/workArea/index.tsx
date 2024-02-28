import { Route, Routes } from "react-router-dom";
import styles from "./index.module.scss";
import Home from "../home";
import Signup from "../signup";
import Signin from "../signin";
import NotFoundPage from "../../pages/errorPages/notFound";
import Profile from "../../pages/profile";

export default function WorkArea() {
  return (
    <div className={styles.workArea}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
