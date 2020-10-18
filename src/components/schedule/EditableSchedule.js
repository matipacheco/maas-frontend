import React, { useState, useEffect, useContext } from 'react';
import { MaasContext } from './../context/Context';
import axios from 'axios';
import { timeFormat } from '../../utils/dateUtil';

export default function EditableSchedule() {
  const maasContext = useContext(MaasContext);
  const week = maasContext.week;
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

  const updateAvailability = (day, hour, employee) => {
    // axios.put(`http://127.0.0.1:3000/api/v1/availability/`, {
    //   week_id: week,
    //   day: day,
    //   hour: hour,
    //   employee_id: employee
    // })
    // .then(response => {
    //   setAvailabilities(response.data);
    // })
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

  const handleOnchange = (event, employee_id) => {
    event.preventDefault();
    props.updateAvailability(props.day, props.hour, employee_id);
  }

  return (
    <tr key={props.hour}>
      {/* <td className={`hour ${employee ? 'green' : 'red'}`}> */}
      <td className='hour'>
        {timeFormat(props.hour)}
      </td>
      {
        employees.map(employee => {
          return (
            <td key={employee.id}>
              <input
                type='checkbox'
                value={employee.id}
                defaultChecked={props.employeeList.includes(employee.id)}
                onChange={ (event) => handleOnchange(event, employee.id)}
              />
            </td>
          )
        })
      }
    </tr>
  )
}
