import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import CreateRecordModal from "../components/CreateRecordModal";
import ConfirmModal from "../components/ConfirmModal";
import { getAuthors, deleteAuthor } from "../services/authorService";
import { events } from "../services/events";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);

  const fetchAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data || []);
  };

  useEffect(() => {
    fetchAuthors();
    const unsubscribe = events.on("refreshDashboard", fetchAuthors);
    return unsubscribe;
  }, []);

  const handleDelete = async (author) => {
    await deleteAuthor(author.id);
    setAuthors((prev) => prev.filter((a) => a.id !== author.id));
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditingAuthor(null);
  };

  const openConfirm = (author) => {
    setAuthorToDelete(author);
    setConfirmOpen(true);
  };

  return (
    <div className="page-container authors-page">
      <div className="page-header">
        <h1>Autores</h1>
        <button className="primary-btn" onClick={() => setOpen(true)}>
          <Plus size={18} /> Nuevo autor
        </button>
      </div>

      <div className="authors-list">
        {authors.length === 0 && <p>No hay autores registrados</p>}
        {authors.map((author) => (
          <div className="author-card" key={author.id}>
            <h3>{author.nombre}</h3>
            <div className="card-actions">
              <button onClick={() => handleEdit(author)}>
                <Edit size={16} />
              </button>
              <button onClick={() => openConfirm(author)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <CreateRecordModal
          open={open}
          type="authors"
          record={editingAuthor}
          onClose={handleModalClose}
          onSuccess={() => fetchAuthors()}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          title="Eliminar autor"
          message={`¿Seguro que quieres eliminar "${authorToDelete?.nombre}"?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => handleDelete(authorToDelete)}
        />
      )}
    </div>
  );
};

export default Authors;