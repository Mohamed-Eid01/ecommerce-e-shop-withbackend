import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  if (!token) {
    return (
         <Navigate to="/" replace />
    );
  }

  return children;
}

export default PrivateRoute;
