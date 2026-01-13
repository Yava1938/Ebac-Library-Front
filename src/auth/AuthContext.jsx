import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

let globalLogout = null; 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    localStorage.setItem("token", data.sessionId);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.sessionId);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      if (token) await authService.logout(token);
    } catch (err) {
      console.log("Logout fallo o sesión ya expirada:", err);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.clear();
    }
  };

  globalLogout = logout;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const callLogout = () => {
  if (globalLogout) globalLogout();
};