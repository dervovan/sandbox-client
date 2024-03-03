import { Navigate, Outlet } from "react-router-dom";
import { IAuthState } from "../../redux/slice/auth";

type Props = {
  auth: IAuthState;
  children: React.ReactElement | JSX.Element;
};

// const ProtectedRoute = ({ auth, ...props }: Props) => {
//   return auth.isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
// };

const ProtectedRoute = ({ auth, children }: Props) => {
 
  return auth.isAuthorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
