import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { MaasContext } from './context/Context';

export default function ServiceSelector() {
  const [services, setServices] = useState([]);

  const maasContext = useContext(MaasContext);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/services")
    .then(response => {
      const services = response.data;
      setServices(services);

      maasContext.updateService(services[0]);
    })
  }, [])

  const handleOnChange = event => {
    const selectedService = services.find(service => {
      return service.id === parseInt(event.target.value)
    });

    maasContext.updateService(selectedService);
  }

  return (
    <li className="list-group-item list-group-item-action bg-light">
      {
        services ?
        <Fragment>
          <label>
            Servicio
          </label>
          <select className='form-control' onChange={handleOnChange}>
            {
              services.map(service => {
                return <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              })
            }
          </select>
        </Fragment> :

        <div class="spinner-border" role="status" />
      }
    </li>
  )
}
