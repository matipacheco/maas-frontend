import React, { useState, useContext } from 'react';
import { MaasContext, MaasContextProvider } from './Context';

export default function ProviderWrapper(props) {
  const maasContext = useContext(MaasContext);
  const [service, setService] = useState(maasContext.service);
  const [week, setWeek] = useState(maasContext.week);

  const updateService = (service) => {
    setService(service);
  }

  const updateWeek = (week) => {
    setWeek(week);
  }

  const provider = {
    service,
    week,
    updateService,
    updateWeek
  }

  return (
    <MaasContextProvider value={provider} >
      {props.children}
    </MaasContextProvider>
  )
}
