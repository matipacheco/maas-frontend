import React, { useState, useEffect, useContext } from 'react';
import { MaasContext } from './../context/Context';
import { timeFormat } from '../../utils/dateUtil';

import axios from 'axios';
import _ from 'lodash';

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

  const updateAvailability = (day, hour, employee_id) => {
    axios.put(`http://127.0.0.1:3000/api/v1/monitoring_shifts/${currentShift}/availabilities`, {
      availability: {
        week_id: week.id,
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

  useEffect(() => {
    console.log("lala");
    console.log(_.isEmpty(employeeList));
  }, [employeeList])

  const handleOnchange = employee_id => event => {
    props.updateAvailability(props.day, props.hour, employee_id);

    setEmployeeList(state => {
      let updatedEmployeeList = state;

      if (updatedEmployeeList.includes(employee_id)) {
        const employeeIndex = updatedEmployeeList.indexOf(employee_id);
        updatedEmployeeList.splice(employeeIndex, 1);
  
      } else {
        updatedEmployeeList.push(employee_id);
      }

      return updatedEmployeeList;
    }); 
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
