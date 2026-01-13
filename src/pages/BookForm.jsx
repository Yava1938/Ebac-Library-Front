import { useState, useEffect } from "react";
import { createBook, updateBook, getBookById } from "../services/bookService";
import { useNavigate, useParams } from "react-router-dom";

const BookForm = () => {
  const [book, setBook] = useState({ nombre: "", anio: "", authorId: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBookById(id).then(setBook);
    }
  }, [id]);

  const handleChange = e =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    id ? await updateBook(id, book) : await createBook(book);
    navigate("/books");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={book.nombre} onChange={handleChange} />
      <input name="anio" value={book.anio} onChange={handleChange} />
      <input name="authorId" value={book.authorId} onChange={handleChange} />
      <button>Guardar</button>
    </form>
  );
};

export default BookForm;