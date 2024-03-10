import { Route, Routes } from "react-router-dom";
import styles from "./index.module.scss";
import Home from "../home";
import Signup from "../signup";
import Signin from "../signin";
import NotFoundPage from "../../pages/errorPages/notFound";
import Profile from "../../pages/profile";
import AccountActivationConfirmation from "../../pages/pleaseActivate";
import ProtectedRoute from "./protectedRoute";
import { IAuthState } from "../../redux/slice/auth";
import Gol from "../gol";

const WorkArea: React.FC<{authData:IAuthState}> = ({authData}: {authData:IAuthState}) => {

  return (
    <div className={styles.workArea}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gol" element={<Gol/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute auth={authData}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pleaseActivate"
          element={
            <ProtectedRoute auth={authData}>
              <AccountActivationConfirmation />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default WorkArea