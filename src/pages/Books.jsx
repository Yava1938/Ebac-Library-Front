import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import CreateRecordModal from "../components/CreateRecordModal";
import ConfirmModal from "../components/ConfirmModal";

import {
  getBooks,
  deleteBook,
  lendBook,
  returnBook,
} from "../services/bookService";

import { getUsers } from "../services/userService";
import { getAuthors } from "../services/authorService";
import { events } from "../services/events";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [loadingBookId, setLoadingBookId] = useState(null);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data || []);
  };

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data || []);
  };

  const fetchAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data || []);
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers();
    fetchAuthors();

    const unsubscribe = events.on("refreshDashboard", fetchBooks);
    return unsubscribe;
  }, []);

  
  const getAuthorName = (authorId) => {
    const author = authors.find((a) => a.id === authorId);
    return author ? author.nombre : "—";
  };


  const handleEdit = (book) => {
    setEditingBook(book);
    setOpen(true);
  };

  const handleDelete = async () => {
    await deleteBook(bookToDelete.id);
    setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id));
    setConfirmOpen(false);
    setBookToDelete(null);
  };

  const handleLend = async (bookId, userId) => {
    try {
      setLoadingBookId(bookId);
      await lendBook(bookId, userId);
      await fetchBooks();
    } finally {
      setLoadingBookId(null);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      setLoadingBookId(bookId);
      await returnBook(bookId);
      await fetchBooks();
    } finally {
      setLoadingBookId(null);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditingBook(null);
  };


  return (
    <div className="page-container books-page">
      <div className="page-header">
        <h1>Libros</h1>
        <button className="primary-btn" onClick={() => setOpen(true)}>
          <Plus size={18} /> Nuevo libro
        </button>
      </div>

      <div className="books-grid">
        {books.length === 0 && <p>No hay libros registrados</p>}

        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.nombre}</h2>

            <p>
              <strong>Año:</strong> {book.anio}
            </p>

            <p>
              <strong>Autor:</strong> {getAuthorName(book.authorId)}
            </p>

            <div className="book-status">
              <span
                className={`status-badge ${
                  book.disponible ? "available" : "borrowed"
                }`}
              >
                {book.disponible ? "Disponible" : "Prestado"}
              </span>

              {book.disponible ? (
                <select
                  disabled={loadingBookId === book.id}
                  defaultValue=""
                  onChange={(e) =>
                    handleLend(book.id, Number(e.target.value))
                  }
                >
                  <option value="" disabled>
                    Prestar a...
                  </option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre}
                    </option>
                  ))}
                </select>
              ) : (
                <button
                  className="btn-return"
                  disabled={loadingBookId === book.id}
                  onClick={() => handleReturn(book.id)}
                >
                  Devolver
                </button>
              )}
            </div>

            <div className="card-actions">
              <button onClick={() => handleEdit(book)}>
                <Edit size={16} />
              </button>
              <button
                onClick={() => {
                  setBookToDelete(book);
                  setConfirmOpen(true);
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <CreateRecordModal
          open={open}
          type="books"
          record={editingBook}
          onClose={handleModalClose}
          onSuccess={fetchBooks}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          title="Eliminar libro"
          message={`¿Seguro que quieres eliminar "${bookToDelete?.nombre}"?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Books;