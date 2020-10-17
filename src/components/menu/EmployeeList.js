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
            {
              maasContext.employees.map((employee, index) => {
                return <div key={index} className="employee-row">
                  <span className={`employee employee-${employee.id}`}>{employee.name}</span>
                  <span className="availability">{employee.availability}</span>
                </div>
              })
            }
          </div>

          <small>
            <p>
              La tabla muestra la cantidad de <b>cupos utilizados</b> por empleado a la semana.
            </p>
          </small>
        </Fragment> :

        <div className="spinner-border" role="status" />
      }
    </li>
  )
}
