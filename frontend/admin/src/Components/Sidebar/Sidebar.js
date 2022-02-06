import React from 'react';
import { push as Menu } from 'react-burger-menu';
import './Sidebar.css';

export default props => {
  return (
    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} >
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/Patients">
        Patients
      </a>
      <a className="menu-item" href="/Responsibles">
        Responsibles
      </a>
    </Menu>
  );
};
