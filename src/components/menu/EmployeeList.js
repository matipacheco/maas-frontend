import React, { useEffect, useContext, Fragment } from 'react';
import { MaasContext } from './../context/Context';
import axios from 'axios';

export default function EmployeeList() {
  const maasContext = useContext(MaasContext);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/employees")
    .then(response => {
      maasContext.updateEmployees(response.data);
    })
  }, [])

  return (
    <li id="employee-list" className="list-group-item list-group-item-action bg-light">
      {
        maasContext.employees ?
        <Fragment>
          <label>
            Empleados
          </label>

          <div className="employee-list">
            <Fragment>
              {
                maasContext.employees.map((employee, index) => {
                  return <div key={index} className="employee-row">
                    <span className={`employee employee-${employee.id}`}>{employee.name}</span>
                    <span className="availability">{employee.availability ? employee.availability : '-'}</span>
                  </div>
                })
              }

              <div className="employee-row">
                <span className='employee'>Sin asignar</span>
                <span className="availability">-</span>
              </div>
            </Fragment>
          </div>

          <small>
            <p>
              La tabla muestra la cantidad de <b>cupos confirmados</b> por empleado para dicha semana.
            </p>
          </small>
        </Fragment> :

        <div className="spinner-border" role="status" />
      }
    </li>
  )
}
