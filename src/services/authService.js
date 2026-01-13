import { API } from "../config/api";
import api from "./api";

export const authService = {
  login: async (username, password) => {
    const response = await api.post(API.LOGIN, { username, password });
    return response.data;
  },

  logout: async () => {
    console.log("Llamando a logout en authService");
    return api.post(API.LOGOUT);
  },
};