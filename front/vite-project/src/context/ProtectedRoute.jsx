import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const userId = localStorage.getItem("userId");

  return user || userId ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
