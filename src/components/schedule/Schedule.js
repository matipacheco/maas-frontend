import React, { useContext, useEffect, useState } from 'react';
import { MaasContext } from './../context/Context';
import axios from 'axios';
import DaySchedule from './ConfirmedSchedule';
import EditableSchedule from './EditableSchedule';

export default function Schedule() {
  const maasContext = useContext(MaasContext);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    setLoading(true);

    if (!maasContext.service || !maasContext.week)
      return;

    axios.get(`http://127.0.0.1:3000/api/v1/monitoring_shifts/${maasContext.week.id}/${maasContext.service.id}`)
    .then(response => {
      if (response.data) {
        setSchedule(response.data.schedule);
      } else {
        setSchedule(null);
      }

      setLoading(false);
    })
  }, [maasContext.service, maasContext.week])

  return (
    <div id='schedule' className="container-fluid">
      {
        loading &&
        <div className="text-center">
          <div className="spinner-border" role="status" />
        </div>
      }

      {
        !loading && !maasContext.editModeOn && schedule ?
          Object.keys(schedule).map((day, index) => {
            return <DaySchedule day={day} schedule={schedule[day]} index={index} />
          }) :

          <div className="text-center">
            <h1>
              No hay agenda disponible
            </h1>
          </div>
      }

      {
        !loading && maasContext.editModeOn && <EditableSchedule />
      }
    </div>
  )
}
