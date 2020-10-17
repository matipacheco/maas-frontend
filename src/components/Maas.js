import React from 'react';
import Menu from './Menu';
import NavBar from './NavBar';

export default function Maas() {
  return (
    <div className="d-flex">
      <Menu/>

      <div id="page-content">
        <NavBar />

        <div className="container-fluid">
          Horario
        </div>
      </div>
    </div>
  );
}
