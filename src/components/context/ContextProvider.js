import React, { useState, useContext } from 'react';
import { MaasContext, MaasContextProvider } from './Context';

export default function ProviderWrapper(props) {
  const maasContext = useContext(MaasContext);
  const [week, setWeek] = useState(maasContext.week);
  const [service, setService] = useState(maasContext.service);
  const [employees, setEmployees] = useState(maasContext.employees);
  const [editModeOn, setEditModeOn] = useState(maasContext.editModeOn);
  const [currentShift, setCurrentShift] = useState(maasContext.currentShift);

  const updateService = service => {
    setService(service);
  }

  const updateWeek = week => {
    setWeek(week);
  }

  const toggleEditMode = () => {
    setEditModeOn(!editModeOn);
  }

  const updateEmployees = employeeList => {
    setEmployees(employeeList);
  }

  const updateCurrentShit = shiftId => {
    setCurrentShift(shiftId);
  }

  const provider = {
    service,
    week,
    editModeOn,
    employees,
    updateService,
    updateWeek,
    toggleEditMode,
    updateEmployees,
    currentShift,
    updateCurrentShit
  }

  return (
    <MaasContextProvider value={provider} >
      {props.children}
    </MaasContextProvider>
  )
}
