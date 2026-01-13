import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth || auth.loading) return <div>Cargando...</div>;

  if (auth.isAuthenticated) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PublicRoute;