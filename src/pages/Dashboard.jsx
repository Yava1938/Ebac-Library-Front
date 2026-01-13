import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import CreateRecordModal from "../components/CreateRecordModal";
import { dashboardService } from "../services/dashboardService";
import { events } from "../services/events";

const Dashboard = () => {
  const [stats, setStats] = useState({ books: 0, authors: 0, users: 0 });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchStats = async () => {
    const data = await dashboardService.fetchStats(true); 
    setStats(data);
  };

  useEffect(() => {
    fetchStats(); 

    
    const unsubscribe = events.on("refreshDashboard", fetchStats);
    return unsubscribe;
  }, []);

  const handleModalSuccess = () => {
    fetchStats(); 
  };

  const isEmpty = stats.books === 0 && stats.authors === 0 && stats.users === 0;

  return (
    <>
      <button className="floating-add-btn" onClick={() => setOpen(true)}>
        <Plus size={18} />
        Nuevo registro
      </button>

      <div className="dashboard">
        <h1>Dashboard</h1>

        {isEmpty ? (
          <div className="empty-state fade-in">
            <div className="icon">📚</div>
            <h2>No hay información registrada</h2>
            <p>Comienza agregando tu primer registro</p>
            <button className="primary-btn" onClick={() => setOpen(true)}>
              <Plus size={18} /> Agregar primer registro
            </button>
          </div>
        ) : (
          <div className="cards">
            <div className="card card-books" onClick={() => navigate("/books")}>
              <h2>{stats.books}</h2>
              <p>Libros</p>
            </div>
            <div className="card card-authors" onClick={() => navigate("/authors")}>
              <h2>{stats.authors}</h2>
              <p>Autores</p>
            </div>
            <div className="card card-users" onClick={() => navigate("/users")}>
              <h2>{stats.users}</h2>
              <p>Usuarios</p>
            </div>
          </div>
        )}
      </div>

      <CreateRecordModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleModalSuccess} 
      />
    </>
  );
};

export default Dashboard;