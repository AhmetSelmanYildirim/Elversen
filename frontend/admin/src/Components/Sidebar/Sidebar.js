import React from 'react';
import './Sidebar.css';
import { useNavigate } from "react-router-dom"


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='sidebarOuterContainer'>
      <div className='sidebarInnerContainer'>
        <div className="menuItem" onClick={() => navigate("/")}>
          <i className="fas fa-home"></i>
        </div>
        <div className="menuItem" onClick={() => navigate("/patients")}>
          <i className="fas fa-child"></i><span className="hint">SMA'lı</span>
        </div>
        <div className="menuItem" onClick={() => navigate("/responsibles")}>
          <i className="fas fa-user"></i><span className="hint">Sorumlu</span>
        </div>
      </div >
    </div >
  );
};

export default Sidebar;
