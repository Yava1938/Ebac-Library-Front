import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth || auth.loading) return <div>Cargando...</div>;


  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;