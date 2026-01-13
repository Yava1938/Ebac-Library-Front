import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;