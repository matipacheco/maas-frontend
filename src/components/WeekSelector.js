import React from 'react';

export default function WeekSelector() {
  return (
    <li class="list-group-item list-group-item-action bg-light">
      <label>
        Semana
      </label>
      <select className='form-control'>
        <option value='1'>
          Semana 1
        </option>
      </select>
    </li>
  )
}
