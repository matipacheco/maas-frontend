import React from 'react';

export default function ServiceSelector() {
  return (
    <li class="list-group-item list-group-item-action bg-light">
      <label>
        Servicio
      </label>
      <select className='form-control'>
        <option value='recorrido'>
          Recorrido.cl
        </option>
      </select>
    </li>
  )
}