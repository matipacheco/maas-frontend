import React, { useContext, useEffect, useState } from 'react';
import { MaasContext } from './../context/Context';
import axios from 'axios';
import DaySchedule from './Day';

export default function Schedule() {
  const maasContext = useContext(MaasContext);
  const [schedule, setSchedule] = useState()

  useEffect(() => {
    if (!maasContext.service || !maasContext.week)
      return;

    axios.get(`http://127.0.0.1:3000/api/v1/monitoring_shifts/${maasContext.service.id}/${maasContext.week.id}`)
    .then(response => {
      setSchedule(response.data.schedule);
    })
  }, [maasContext.service, maasContext.week])

  return (
    <div id='schedule' className="container-fluid">
      {
        schedule ?
        Object.keys(schedule).map((day, index) => {
          return <DaySchedule day={day} schedule={schedule[day]} index={index} />
        }) :

        <div className="text-center">
          <div className="spinner-border" role="status" />
        </div>
      }
    </div>
  )
}
