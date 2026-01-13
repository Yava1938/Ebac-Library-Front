import axios from "axios";
import { callLogout } from "../auth/AuthContext";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["X-SESSION-ID"] = token;
  }
  return config;
});


api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Sesión expirada");
      callLogout();
    }
    return Promise.reject(error);
  }
);

export default api;