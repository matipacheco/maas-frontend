import React, { useContext } from 'react';
import { MaasContext } from './context/Context';

export default function NavBar() {
  const maasContext = useContext(MaasContext);

  const handleClick = event => {
    event.preventDefault();
    maasContext.toggleEditMode();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom d-flex">
      <h4>Disponibilidad</h4>
      <div className={`btn btn-${maasContext.editModeOn ? 'success': 'info'}`} onClick={handleClick}>
        {maasContext.editModeOn ? 'Guardar': 'Editar'}
      </div>
    </nav>
  )
}
