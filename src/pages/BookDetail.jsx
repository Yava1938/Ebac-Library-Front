import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id).then(setBook);
  }, [id]);

  if (!book) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{book.nombre}</h2>
      <p>Año: {book.anio}</p>
      <p>Disponible: {book.disponible ? "Sí" : "No"}</p>
    </div>
  );
};

export default BookDetail;