import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const auth = useAuth();

  if (!auth || auth.loading) return null;

  const { user } = auth;

  return (
    <nav className="navbar">
      <div className="navbar-left">
      </div>

      <div className="navbar-right">
        <span className="username">Hola, {user.username}</span>
        
      </div>
    </nav>
  );
};

export default Navbar;