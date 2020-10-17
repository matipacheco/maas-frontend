import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServiceSelector() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/services")
    .then(response => {
      setServices(response.data)
    })
  }, [])

  return (
    <li className="list-group-item list-group-item-action bg-light">
      <label>
        Servicio
      </label>
      <select className='form-control'>
        {
          services.map(service => {
            return <option key={service.id} value={service.name}>
              {service.name}
            </option>
          })
        }
      </select>
    </li>
  )
}
