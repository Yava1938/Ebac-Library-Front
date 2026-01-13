import api from "./api";
import { events } from "./events";

const STORAGE_KEY = "books";

export const getBooks = async () => {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) return JSON.parse(cached);

  const res = await api.get("/books");
  const books = res.data.resultado || [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  return books;
};

export const getBookById = async (id) => {
  const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const book = books.find((b) => b.id === id);
  if (book) return book;

  const res = await api.get(`/books/${id}`);
  return res.data.resultado;
};

export const createBook = async (book) => {
  const res = await api.post("/books", book);
  const newBook = res.data.resultado;

  const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  books.push(newBook);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));

  events.emit("refreshDashboard");
  return newBook;
};

export const updateBook = async (id, book) => {
  console.log("Updating book with id:", id, "and data:", book);
  const res = await api.put(`/books/${id}`, book);
  console.log("res", res);
  const updatedBook = res.data.resultado;
  console.log("updatedBook", updatedBook);

  const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  console.log("books", books);
  const index = books.findIndex((b) => b.id === id);
  console.log(index);
  if (index !== -1) books[index] = updatedBook;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));

  events.emit("refreshDashboard");
  return updatedBook;
};

export const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
  const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const updatedBooks = books.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));

  events.emit("refreshDashboard");
};

export const lendBook = async (id, userId) => {
  console.log("lend book with id:", id, "and userId:", userId);
  const res = await api.post(`/books/${id}/lend/${userId}`);
  console.log("res", res);
  const updatedBook = res.data.resultado;
  console.log("updatedBook", updatedBook);

  const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  console.log("books", books);
  const index = books.findIndex((b) => b.id === id);
  console.log(index);
  if (index !== -1) books[index] = updatedBook;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));

  events.emit("refreshDashboard");
  return updatedBook;
};

export const returnBook = async (id) => {
  console.log("retornando book with id:", id);
  const res = await api.post(`/books/${id}/return`);
  console.log("res", res);
  const updatedBook = res.data.resultado;
  console.log("updatedBook", updatedBook);

  const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  console.log("books", books);
  const index = books.findIndex((b) => b.id === id);
  console.log(index);
  if (index !== -1) books[index] = updatedBook;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));

  events.emit("refreshDashboard");
  return updatedBook;
};