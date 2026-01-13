
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import DynamicForm from "./form/DynamicForm";
import { FORMS_CONFIG } from "../config/crudFormulario";
import { events } from "../services/events";
import { dashboardService } from "../services/dashboardService";

import {
  createBook,
  updateBook,
} from "../services/bookService";
import {
  createUser,
  updateUser,
} from "../services/userService";
import {
  createAuthor,
  updateAuthor,
} from "../services/authorService";

const STORAGE_KEYS = {
  books: "books",
  authors: "authors",
  users: "users",
};

const CreateRecordModal = ({ open, onClose, onSuccess, type, record }) => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(type || "");
  const config = FORMS_CONFIG[selectedType];

  useEffect(() => {
    if (!open) setLoading(false);
  }, [open]);

  const handleSubmit = async (data) => {
    if (!selectedType) return toast.error("Selecciona un tipo de registro");
    if (!config) return;

    try {
      setLoading(true);
      let newRecord;
      console.log("Record to edit:", record);
      console.log("selectedType:", selectedType);

      if (record) {
        if (selectedType === "books") newRecord = await updateBook(record.id, data);
        if (selectedType === "authors") newRecord = await updateAuthor(record.id, data);
        if (selectedType === "users") newRecord = await updateUser(record.id, data);

        const current = JSON.parse(localStorage.getItem(STORAGE_KEYS[selectedType]) || "[]");
        const updated = current.map((r) => (r.id === record.id ? newRecord : r));
        localStorage.setItem(STORAGE_KEYS[selectedType], JSON.stringify(updated));

        toast.success(`${config.title.replace(/^Agregar\s+/i, "")} actualizado correctamente`);
      } else {
        if (selectedType === "books") newRecord = await createBook(data);
        if (selectedType === "authors") newRecord = await createAuthor(data);
        if (selectedType === "users") newRecord = await createUser(data);

        const current = JSON.parse(localStorage.getItem(STORAGE_KEYS[selectedType]) || "[]");
        current.push(newRecord);
        localStorage.setItem(STORAGE_KEYS[selectedType], JSON.stringify(current));

        toast.success(`${config.title.replace(/^Agregar\s+/i, "")} creado correctamente`);
      }

      await dashboardService.fetchStats(true);
      events.emit("refreshDashboard");

      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title">
        {record
          ? `Editar ${config?.title.replace(/^Agregar\s+/i, "") || ""}`
          : "Agregar nuevo registro"}
      </h2>

      {!record && (
        <div className="form-group">
          <label>Tipo de registro</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Selecciona</option>
            <option value="books">Libro</option>
            <option value="authors">Autor</option>
            <option value="users">Usuario</option>
          </select>
        </div>
      )}

      {config && (
        <DynamicForm
          config={config}
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={record || {}}
        />
      )}
    </Modal>
  );
};

export default CreateRecordModal;