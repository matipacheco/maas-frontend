import React, { useContext } from 'react';
import { MaasContext } from './context/Context';

export default function NavBar() {
  const maasContext = useContext(MaasContext);
  const editModeOn = maasContext.editModeOn;
  const week = maasContext.week;

  const handleClick = () => {
    maasContext.toggleEditMode();
  }

  const handleSubmit = () => {
    // Call for monitoring_shift/update endpoint!
    maasContext.toggleEditMode();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom d-flex">
      {
        week &&
        <h4>
          {
            editModeOn ? `Disponibilidad ${week.name}` : "Turnos Confirmados"
          }
        </h4>
      }

      <div>
        <div className={`btn btn-${editModeOn ? 'success': 'info'}`} onClick={editModeOn ? handleSubmit : handleClick}>
          {editModeOn ? 'Guardar': 'Editar'}
        </div>
      </div>
    </nav>
  )
}
