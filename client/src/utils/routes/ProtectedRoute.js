import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useSelector((state) => state.auth);

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    console.log("Role: ", role);
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
