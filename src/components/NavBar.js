import React, { useContext } from 'react';
import { MaasContext } from './context/Context';

export default function NavBar() {
  const maasContext = useContext(MaasContext);
  const editModeOn  = maasContext.editModeOn;

  const handleClick = () => {
    maasContext.toggleEditMode();
  }

  const handleSubmit = () => {
    maasContext.toggleEditMode();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom d-flex">
      <h4>Calendario de Monitoreo</h4>

      <div>
        {
          editModeOn &&
          <div className="btn btn-danger mr-2" onClick={handleClick}>
            Cancelar
          </div>
        }
        <div className={`btn btn-${editModeOn ? 'success': 'info'}`} onClick={editModeOn ? handleSubmit : handleClick}>
          {editModeOn ? 'Guardar': 'Editar'}
        </div>
      </div>
    </nav>
  )
}
