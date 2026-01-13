import api from "./api";
import { events } from "./events";

const STORAGE_KEY = "users";

export const getUsers = async () => {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) return JSON.parse(cached);

  const res = await api.get("/users");
  const users = res.data.resultado || [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return users;
};

export const createUser = async (user) => {
  const res = await api.post("/users", user);
  const newUser = res.data.resultado;

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  events.emit("refreshDashboard");
  return newUser;
};

export const updateUser = async (id, user) => {
  const res = await api.put(`/users/${id}`, user);
  const updatedUser = res.data.resultado;

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) users[index] = updatedUser;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  events.emit("refreshDashboard");
  return updatedUser;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const updatedUsers = users.filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

  events.emit("refreshDashboard");
};