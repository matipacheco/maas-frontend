import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MaasContext } from './context/Context';

export default function WeekSelector() {
  const [weeks, setWeeks] = useState([]);

  const maasContext = useContext(MaasContext);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/weeks")
    .then(response => {
      setWeeks(response.data)
    })
  }, [])

  return (
    <li className="list-group-item list-group-item-action bg-light">
      <label>
        Semana
      </label>
      <select className='form-control'>
        {
          weeks.map(week => {
            return <option key={week.id} value={week.id}>
              {week.name}
            </option>
          })
        }
      </select>
    </li>
  )
}
