import React, { useContext } from 'react';
import { MaasContext } from './context/Context';

import axios from 'axios';

export default function NavBar() {
  const maasContext = useContext(MaasContext);
  const editModeOn = maasContext.editModeOn;
  const week = maasContext.week;

  const handleClick = () => {
    maasContext.toggleEditMode();
  }

  const handleSubmit = () => {
    maasContext.toggleEditMode();

    axios.put(`http://127.0.0.1:3000/api/v1/monitoring_shifts/${maasContext.currentShift}`)
    .then(() => {
      maasContext.updateRefreshShifts(true);
    })
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

      <div id="edit-button">
        <div className={`btn btn-${editModeOn ? 'success': 'info'}`} onClick={editModeOn ? handleSubmit : handleClick}>
          {editModeOn ? 'Confirmar disponibilidad': 'Editar disponibilidad'}
        </div>
      </div>
    </nav>
  )
}
