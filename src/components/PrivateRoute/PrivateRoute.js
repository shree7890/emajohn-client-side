import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";

const PrivateRoute = ({ children }) => {
  let { currentUser, isLoading } = useAuth();
  let location = useLocation();
  if (isLoading) {
    return <p className="load">Loading...</p>;
  }
  if (!currentUser.displayName) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};
export default PrivateRoute;
