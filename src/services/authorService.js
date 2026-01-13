import api from "./api";
import { events } from "./events";

const STORAGE_KEY = "authors";

export const getAuthors = async () => {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) return JSON.parse(cached);

  const res = await api.get("/autores");
  const authors = res.data.resultado || [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
  return authors;
};

export const createAuthor = async (author) => {
  const res = await api.post("/autores", author);
  const newAuthor = res.data.resultado;

  const authors = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  authors.push(newAuthor);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));

  events.emit("refreshDashboard");
  return newAuthor;
};

export const updateAuthor = async (id, author) => {
  const res = await api.put(`/autores/${id}`, author);
  const updatedAuthor = res.data.resultado;

  const authors = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const index = authors.findIndex((a) => a.id === id);
  if (index !== -1) authors[index] = updatedAuthor;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));

  events.emit("refreshDashboard");
  return updatedAuthor;
};

export const deleteAuthor = async (id) => {
  await api.delete(`/autores/${id}`);
  const authors = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const updatedAuthors = authors.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAuthors));

  events.emit("refreshDashboard");
};