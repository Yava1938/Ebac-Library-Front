import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import CreateRecordModal from "../components/CreateRecordModal";
import ConfirmModal from "../components/ConfirmModal";
import { getUsers, deleteUser } from "../services/userService";
import { events } from "../services/events";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    fetchUsers();
    const unsubscribe = events.on("refreshDashboard", fetchUsers);
    return unsubscribe;
  }, []);

  const handleDelete = async (user) => {
    await deleteUser(user.id);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const openConfirm = (user) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  return (
    <div className="page-container users-page">
      <div className="page-header">
        <h1>Usuarios</h1>
        <button className="primary-btn" onClick={() => setOpen(true)}>
          <Plus size={18} /> Nuevo usuario
        </button>
      </div>

      <div className="users-table">
        {users.length === 0 && <p>No hay usuarios registrados</p>}
        {users.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>
                      <Edit size={16} />
                    </button>
                    <button onClick={() => openConfirm(user)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {open && (
        <CreateRecordModal
          open={open}
          type="users"
          record={editingUser}
          onClose={handleModalClose}
          onSuccess={() => fetchUsers()}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          title="Eliminar usuario"
          message={`¿Seguro que quieres eliminar "${userToDelete?.nombre}"?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => handleDelete(userToDelete)}
        />
      )}
    </div>
  );
};

export default Users;