import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import { events } from "../services/events";

export const useBooks = () => {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data || []);
  };

  const removeBook = async (id) => {
    await deleteBook(id);
    await loadBooks();
  };

  useEffect(() => {
    loadBooks();

    const unsubscribe = events.on("refreshDashboard", loadBooks);
    return unsubscribe;
  }, []);

  return { books, removeBook };
};