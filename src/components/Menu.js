import React from 'react';
import WeekSelector from './WeekSelector';
import ServiceSelector from './ServiceSelector';

export default function Menu() {
  return (
    <div class="bg-light border-right" id="sidebar-menu">
      <div class="sidebar-heading">Menu</div>

      <ul class="list-group list-group-flush">
        <ServiceSelector />
        <WeekSelector />
      </ul>
    </div>
  )
}
