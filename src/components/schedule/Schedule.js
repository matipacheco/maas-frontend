import React, { useContext, useEffect, useState } from 'react';
import { MaasContext } from './../context/Context';
import DaySchedule from './ConfirmedSchedule';
import EditableSchedule from './EditableSchedule';

import _ from 'lodash';
import axios from 'axios';

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

    axios.get('http://127.0.0.1:3000/api/v1/monitoring_shifts', {
      params: {
        week_id: maasContext.week.id,
        service_id: maasContext.service.id
      }
    })
    .then(response => {
      if (response.data) {
        const structure = response.data.structure;
        const schedule = _.isEmpty(structure) ? {} : structure.schedule;
        const workloads = _.isEmpty(structure) ? {} : structure.workloads;

        setSchedule(schedule);

        maasContext.updateCurrentShift(response.data.id);
        maasContext.setEmployeesAvailabilities(workloads);

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
            There aren't shifts confirmed yet
          </h1>
          <p>
            Edit the availability of your employees to fill the schedule.
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
