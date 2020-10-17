import React, { useState, useContext } from 'react';
import { MaasContext, MaasContextProvider } from './Context';

export default function ProviderWrapper(props) {
  const maasContext = useContext(MaasContext);
  const [service, setService] = useState(maasContext.service);
  const [week, setWeek] = useState(maasContext.week);
  const [editModeOn, setEditModeOn] = useState(maasContext.editModeOn);

  const updateService = service => {
    setService(service);
  }

  const updateWeek = week => {
    setWeek(week);
  }

  const toggleEditMode = () => {
    setEditModeOn(!editModeOn);
  }

  const provider = {
    service,
    week,
    editModeOn,
    updateService,
    updateWeek,
    toggleEditMode
  }

  return (
    <MaasContextProvider value={provider} >
      {props.children}
    </MaasContextProvider>
  )
}
