import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/pages/_login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(username, password);
      console.log("Login exitoso");
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Iniciar Sesión</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;