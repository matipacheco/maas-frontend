import React from 'react';
import Menu from './Menu';

function App() {
  return (
    <div className="d-flex">
      <Menu/>
      <div id="page-content">

        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom d-flex">
          <button class="btn btn-success" id="menu-toggle">Editar disponibilidad</button>
        </nav>

        <div class="container-fluid">
          <h1 class="mt-4">Disponibilidad</h1>
        </div>

      </div>
    </div>
  );
}

export default App;
