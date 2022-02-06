import React from 'react';
import './Sidebar.css';
import { useNavigate } from "react-router-dom"


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='sidebarOuterContainer'>
      <div className='sidebarInnerContainer'>
        <a className="menuItem" onClick={() => navigate("/")}>
          <i className="fas fa-home"></i>
        </a>
        <a className="menuItem" onClick={() => navigate("/patients")}>
          <i className="fas fa-child"></i><span class="hint">SMA'lı</span>
        </a>
        <a className="menuItem" onClick={() => navigate("/responsibles")}>
          <i className="fas fa-user"></i><span class="hint">Sorumlu</span>
        </a>
      </div >
    </div >
  );
};

export default Sidebar;
