import React from 'react';
import Menu from './Menu';
import NavBar from './NavBar';
import Schedule from './schedule/Schedule';
import ProviderWrapper from './context/ContextProvider';

export default function Maas() {
  return (
    <div className="d-flex">
      <ProviderWrapper>
        <Menu/>

        <div id="page-content">
          <NavBar />
          <Schedule />
        </div>
      </ProviderWrapper>
    </div>
  );
}
