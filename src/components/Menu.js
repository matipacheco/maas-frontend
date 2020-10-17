import React from 'react';
import WeekSelector from './menu/WeekSelector';
import ServiceSelector from './menu/ServiceSelector';
import EmployeeList from './menu/EmployeeList';

export default function Menu() {
  return (
    <div className="bg-light border-right" id="sidebar-menu">
      <div className="sidebar-heading">Menu</div>

      <ul className="list-group list-group-flush">
        <ServiceSelector />
        <WeekSelector />
        <EmployeeList />
      </ul>
    </div>
  )
}
