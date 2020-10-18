import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { MaasContext } from './../context/Context';

export default function WeekSelector() {
  const [weeks, setWeeks] = useState([]);

  const maasContext = useContext(MaasContext);
  const editModeOn = maasContext.editModeOn;

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/weeks")
    .then(response => {
      const weeks = response.data;
      setWeeks(weeks);

      maasContext.updateWeek(weeks[0]);
    })
  }, [])

  const handleOnChange = event => {
    const selectedWeek = weeks.find(week => {
      return week.id === parseInt(event.target.value)
    });

    maasContext.updateWeek(selectedWeek);
  }

  return (
    <li className="list-group-item list-group-item-action bg-light">
      {
        weeks ?
        <Fragment>
          <label>
            Semana
          </label>
          <select className='form-control' onChange={handleOnChange} disabled={editModeOn}>
            {
              weeks.map(week => {
                return <option key={week.id} value={week.id}>
                  {week.name}
                </option>
              })
            }
          </select>

          {
            maasContext.week &&
            <p className="date-range">
              <small>
                del
              </small>
              &nbsp;
              <b>{ maasContext.week.start_date }</b>
              &nbsp;
              <small>
                hasta
              </small>
              &nbsp;
              <b>{ maasContext.week.end_date }</b>
            </p>
          }
        </Fragment> :

        <div className="spinner-border" role="status" />
      }
    </li>
  )
}
