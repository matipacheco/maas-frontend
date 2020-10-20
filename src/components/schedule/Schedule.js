import React, { useContext, useEffect, useState } from 'react';
import { MaasContext } from './../context/Context';
import DaySchedule from './ConfirmedSchedule';
import EditableSchedule from './EditableSchedule';

import _ from 'lodash';
import axios from 'axios';

import blocksAssigned from './../../utils/employeesUtil';

export default function Schedule() {
  const maasContext = useContext(MaasContext);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    if (!maasContext.service || !maasContext.week)
      return;
    
    if (maasContext.refreshShifts)
      maasContext.updateRefreshShifts(false);

    fecthMonitoringShifts();
  }, [maasContext.service, maasContext.week, maasContext.refreshShifts])

  const fecthMonitoringShifts = () => {
    setLoading(true);

    axios.get(`http://127.0.0.1:3000/api/v1/monitoring_shifts/${maasContext.week.id}/${maasContext.service.id}`)
    .then(response => {
      if (response.data) {
        const schedule = response.data.structure;
        setSchedule(schedule);

        maasContext.updateCurrentShift(response.data.id);
        maasContext.setEmployeesAvailabilities(blocksAssigned(schedule));

      } else {
        setSchedule(null);
      }

      setLoading(false);
    })
  }

  return (
    <div id='schedule' className="container-fluid">
      {
        loading &&
        <div className="text-center">
          <div className="spinner-border" role="status" />
        </div>
      }

      {
        !loading && !maasContext.editModeOn && _.isEmpty(schedule) &&
        <div className="text-center">
          <h1>
            No hay turnos confirmados
          </h1>
          <p>
            Edita la disponibilidad de tus empleados para poder generar un horario.
          </p>
        </div>
      }

      {
        !loading && !maasContext.editModeOn && schedule &&
        Object.keys(schedule).map((day, index) => {
          return <DaySchedule day={day} schedule={schedule[day]} index={index} />
        })
      }

      {
        !loading && maasContext.editModeOn && <EditableSchedule />
      }
    </div>
  )
}
