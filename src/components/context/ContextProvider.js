import React, { useState, useContext } from 'react';
import EmployeeList from '../menu/EmployeeList';
import { MaasContext, MaasContextProvider } from './Context';

export default function ProviderWrapper(props) {
  const maasContext = useContext(MaasContext);
  const [week, setWeek] = useState(maasContext.week);
  const [service, setService] = useState(maasContext.service);
  const [employees, setEmployees] = useState(maasContext.employees);
  const [editModeOn, setEditModeOn] = useState(maasContext.editModeOn);
  const [currentShift, setCurrentShift] = useState(maasContext.currentShift);
  const [refreshShifts, setRefreshShifts] = useState(maasContext.refreshShifts);

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

  const setEmployeesAvailabilities = occurrences => {
    let employeeList = [...employees];
    
    if (employeeList.length == 0)
      return

    employeeList = employeeList.map(employee => {
      return ({...employee, availability: occurrences[employee.id]});
    });

    setEmployees(employeeList);
  }

  const updateCurrentShift = shiftId => {
    setCurrentShift(shiftId);
  }

  const updateRefreshShifts = value => {
    setRefreshShifts(value);
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
    updateCurrentShift,
    refreshShifts,
    updateRefreshShifts,
    setEmployeesAvailabilities
  }

  return (
    <MaasContextProvider value={provider} >
      {props.children}
    </MaasContextProvider>
  )
}
