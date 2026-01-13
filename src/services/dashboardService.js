import api from "./api";

const STORAGE_KEYS = {
  authors: "authors",
  books: "books",
  users: "users",
};

export const dashboardService = {
  async fetchStats(forceRefresh = false) {
    if (!forceRefresh) {
      const authors = JSON.parse(localStorage.getItem(STORAGE_KEYS.authors) || "[]");
      const books = JSON.parse(localStorage.getItem(STORAGE_KEYS.books) || "[]");
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");

      if (authors.length || books.length || users.length) {
        return {
          authors: authors.length,
          books: books.length,
          users: users.length,
        };
      }
    }

    const [authorsRes, booksRes, usersRes] = await Promise.all([
      api.get("/autores"),
      api.get("/books"),
      api.get("/users"),
    ]);

    const authors = authorsRes.data.resultado || [];
    const books = booksRes.data.resultado || [];
    const users = usersRes.data.resultado || [];

    localStorage.setItem(STORAGE_KEYS.authors, JSON.stringify(authors));
    localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books));
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));

    return {
      authors: authors.length,
      books: books.length,
      users: users.length,
    };
  },
};