import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       
  const [token, setToken] = useState(null);     
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);                  
        setUser("Admin");
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Datos de login recibidos:", data);
    setToken(data.token);  
    setUser(data.user);
  };

  const logout = async () => {
    if (token) {
      console.log("Cerrando sesión con token:", token);
      await authService.logout(token);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);  
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);