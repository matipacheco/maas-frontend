import React, { useState, useEffect, useContext } from 'react';
import { MaasContext } from './../context/Context';
import { timeFormat } from '../../utils/dateUtil';

import axios from 'axios';
import _ from 'lodash';

export default function EditableSchedule() {
  const maasContext = useContext(MaasContext);
  const employees = maasContext.employees;
  const currentShift = maasContext.currentShift;

  const [availabilities, setAvailabilities] = useState({});

  useEffect(() => {
    if (currentShift)
      axios.get(`http://127.0.0.1:3000/api/v1/monitoring_shifts/${currentShift}/availabilities`)
      .then(response => {
        setAvailabilities(response.data);
      })
  }, [])

  const updateAvailability = (day, hour, employee_id) => {
    axios.put(`http://127.0.0.1:3000/api/v1/monitoring_shifts/${currentShift}/availabilities`, {
      availability: {
        employee_id: employee_id,
        day: parseInt(day),
        hour: parseInt(hour)
      }
    })
    .then(response => {})
  }

  return (
    availabilities && employees &&
    Object.keys(availabilities).map((day, index) => {
      return <Day
        day={day}
        dayIndex={index}
        availabilities={availabilities[day]}
        updateAvailability={updateAvailability}
      />
    })
  )
}

function Day(props) {
  const maasContext = useContext(MaasContext);
  const employees = maasContext.employees;

  return (
    <table key={props.dayIndex} className='table table-bordered'>
      <thead className='schedule-day-head'>
        <tr>
          <th>{props.day}</th>
          {
            employees.map(employee => {
              return <th key={employee.id}>{employee.name}</th>
            })
          }
        </tr>
      </thead>

      <tbody className='schedule-day-body'>
        {
          Object.keys(props.availabilities).map((hour) => {
            return <Hour
              hour={hour}
              day={props.dayIndex}
              employeeList={props.availabilities[hour]}
              updateAvailability={props.updateAvailability}
            />
          })
        }
      </tbody>
    </table>
  )
}


function Hour(props) {
  const maasContext = useContext(MaasContext);
  const employees = maasContext.employees;

  const [employeeList, setEmployeeList] = useState(props.employeeList);

  const handleOnchange = employeeId => event => {
    let updatedEmployeeList = [...employeeList];

    if (updatedEmployeeList.includes(employeeId)) {
      const employeeIndex = updatedEmployeeList.indexOf(employeeId);
      updatedEmployeeList.splice(employeeIndex, 1);

    } else {
      updatedEmployeeList.push(employeeId);
    }

    setEmployeeList(updatedEmployeeList);
    props.updateAvailability(props.day, props.hour, employeeId);
  }

  return (
    <tr key={props.hour}>
       <td className={`hour ${_.isEmpty(employeeList) ? 'red' : 'green'}`}>
        {timeFormat(props.hour)}
      </td>
      {
        employees.map(employee => {
          return (
            <td key={employee.id}>
              <input
                type='checkbox'
                value={employee.id}
                defaultChecked={employeeList.includes(employee.id)}
                onChange={handleOnchange(employee.id)}
              />
            </td>
          )
        })
      }
    </tr>
  )
}
