import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../services/authorService";

export const useAuthors = () => {
  const [authors, setAuthors] = useState([]);

  const loadAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data || []);
  };

  const removeAuthor = async (id) => {
    await deleteAuthor(id);
    await loadAuthors();
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadAuthors();
    };
    fetchData();
  }, []);

  return { authors, removeAuthor };
};