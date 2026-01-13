import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <h2>Biblioteca</h2>
      <nav className="sidebar-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/books">Libros</NavLink>
        <NavLink to="/authors">Autores</NavLink>
        <NavLink to="/users">Usuarios</NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;