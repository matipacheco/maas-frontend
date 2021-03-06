import React, { useEffect, useContext, Fragment } from 'react';
import { MaasContext } from './../context/Context';
import axios from 'axios';

export default function EmployeeList() {
  const maasContext = useContext(MaasContext);
  const employees = maasContext.employees;
  const availabilities = maasContext.assignedAvailabilities;

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/employees")
    .then(response => {
      maasContext.updateEmployees(response.data);
    })
  }, [])

  return (
    <li id="employee-list" className="list-group-item list-group-item-action bg-light">
      {
        employees ?
        <Fragment>
          <label>
            Employees
          </label>

          <div className="employee-list">
            <Fragment>
              {
                employees.map((employee, index) => {
                  let availability = availabilities && availabilities[employee.id];

                  return <div key={index} className="employee-row">
                    <span className={`employee employee-${employee.id}`}>{employee.name}</span>
                    <span className="availability">{availability ? availability : '0'}</span>
                  </div>
                })
              }

              <div className="employee-row">
                <span className='employee'>Not assigned </span>
                <span className="availability">{availabilities && availabilities[""] ? availabilities[""] : '-'}</span>
              </div>
            </Fragment>
          </div>

          <small>
            <p>
              This table shows the <b>confirmed shifts</b> for each employee in the given week.
            </p>
          </small>
        </Fragment> :

        <div className="spinner-border" role="status" />
      }
    </li>
  )
}
