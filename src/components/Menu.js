import React from 'react';
import WeekSelector from './WeekSelector';
import ServiceSelector from './ServiceSelector';
import EmployeeList from './EmployeeList';

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
